// lib/app.ts
import express from "express";
import path from "path";
import * as typeorm from "typeorm";
import {v4 as uuid} from "uuid";
import "reflect-metadata";

import * as common from "../common/common";
import {Food, User} from "./db";
import { string } from "prop-types";

interface Session {
  session_uuid: string;
  user_id: number;
  session_start: Date;
}

typeorm.createConnection({
  type: "sqlite",
  database: "db.sqlite",
  entities: [Food, User],
  synchronize: true,
  logging: false
}).then(async connection => {

  const sessions: { [session_uuid: string]: Session } = {};

  function validateLiveSession(x: any): x is string {
    return typeof x === "string" && typeof sessions[x] !== "undefined";
  }
  function getLiveSession(session_uuid: any): Session | null {
    return validateLiveSession(session_uuid) ? sessions[session_uuid] : null;
  }

  const food_repo = connection.getRepository(Food);
  const user_repo = connection.getRepository(User);
  
  const app: express.Application = express();
  app.use(express.json());
  app.use("/static", express.static(path.join(__dirname, "../../static")));
  app.use("/dist", express.static(path.join(__dirname, "../../dist")));

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.post("/register", (req, res) => {
    if (!common.validateUser(req.body)) { console.log(req.body); res.json(false); return; }
    console.log(req.body);
    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.business_name = req.body.business_name;
    user.latitude = req.body.location.latitude;
    user.longitude = req.body.location.longitude;
    user_repo.save(user);
    res.json(true);
  });

  app.post("/login", async (req, res) => {
    if (!common.validateUserAndPass(req)) { res.json(false); return; }
    const user = await user_repo.findOne({ username: req.body.username, password: req.body.password });
    const session_uuid = uuid();
    res.cookie("session_uuid", session_uuid);
    await res.json(true);
  });

  app.get("/logout", (req, res) => {
    const session_uuid = req.cookies.session_uuid;
    if (!validateLiveSession(session_uuid)) {
      delete sessions[session_uuid];
    }
    res.sendStatus(200);
  });

  app.post("/food", (req, res) => {
    if (! common.validateFoodLocation(req.body)) {
      res.sendStatus(400);
      return;
    }
    const session = getLiveSession(req.cookies.session_uuid);
    if (session === null) {
      res.sendStatus(400);
      return;
    }
    // const user = user_repo.find({user: { id: session.user_id}});

    const user = new User();
    user.id = session.user_id;
    const food = new Food()
    food.user = user;
    food.description = req.body.description;
    food.image = req.body.image;
    food.end_time = new Date();
    food_repo.save(food);
    res.sendStatus(200);
  });

  function foodToFoodLocation(food: Food): common.FoodLocation {
    return {
      id: food.id,
      business_name: food.user.business_name,
      location: {
        latitude: food.user.latitude,
        longitude: food.user.longitude,
      },
      description: food.description,
      urgency: food.urgency as common.Urgency,
      image: food.image,
    };
  }

  app.get("/food", async (req, res) => {
    res.json((await food_repo.find({end_time: typeorm.MoreThan(new Date())})).map(foodToFoodLocation));
  });

  app.get("/food/self", async (req, res) => {
    const session = getLiveSession(req.cookies.session_uuid);
    if (session === null) { res.sendStatus(404); return; }
    const user = user_repo.findOne(session.user_id);
    if (user === null) {
      delete sessions[req.cookies.session_uuid];
      res.sendStatus(404);
      return;
    }
    res.json(
      (await food_repo.find({user: { id: session.user_id }, end_time: typeorm.MoreThan(new Date())}))
        .map(foodToFoodLocation)
    );
  });

  app.post("/food/cancel", async (req, res) => {
    if (!common.validateFoodCancel(req.body)) { res.sendStatus(404); return; }
    const f = await food_repo.findOne(req.body.id)
    if (f === undefined) { res.sendStatus(404); return; }
    await food_repo.remove(f);
    res.sendStatus(200);
  });

  app.listen(8000, () => {
    console.log("Example app listening on port 8000!");
  });

}).catch(error => console.log(error));
