// lib/app.ts
import express from "express";
import path from "path";
import typeorm from "typeorm";
import {v4 as uuid} from "uuid";
import "reflect-metadata";

import * as common from "../common/common";
import {Food, User} from "./db";
import { string } from "prop-types";

interface Session {
  session_uuid: string;
  id: number;
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

  });

  app.post("/login", (req, res) => {

  });

  app.get("/logout", (req, res) => {

  });

  app.post("/food", (req, res) => {

  });

  app.get("/food", (req, res) => {

  });

  app.get("/food/self", (req, res) => {
    if (typeof(req.cookies.session_uuid) == "string") {
      const user = sessions[req.cookies.session_uuid]
      if (user) {
        res.json(food_repo.find({id: user.id}))
      }
    }
    res.sendStatus(404)
  });

  app.post("/food/cancel", async (req, res) => {
    if (validateFoodCancel(req.body)) {
      await food_repo.remove(req.body.id);
    }
  });

  app.listen(8000, () => {
    console.log("Example app listening on port 8000!");
  });

}).catch(error => console.log(error));
