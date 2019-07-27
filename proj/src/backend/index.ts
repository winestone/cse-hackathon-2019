// lib/app.ts
import express from "express";
import path from "path";
import { v4 as uuid } from "uuid";

import * as common from "../common/common";

// Create a new express application instance
const app: express.Application = express();

type FoodLocationWithTime = common.AddFoodLocation & { time: Date };

interface User {
  username: string;
  password: string;
  business_name: string;
  address: string;
}
interface Session {
  session_uuid: string;
  username: string;
  session_start: Date;
}

const users_by_username: { [username: string]: User } = {};
const sessions: { [session_uuid: string]: Session } = {};
const food_locations: FoodLocationWithTime[] = [];

function isLoggedIn(req: express.Request): boolean {
  return sessions[req.cookies.session_uuid] !== undefined;
}
// Returns whether registration was successful
function registerUser(user: User): boolean {
  if ( users_by_username[user.username] !== undefined ) {
    return false;
  }
  users_by_username[user.username] = user;
  return true;
}

// return session uuid
function loginUser(username: string, password: string): string | null {
  const user = users_by_username[username];
  if (user === undefined || user.password !== password) return null;
  const session_uuid = uuid();
  sessions[session_uuid] = {
    session_uuid,
    username,
    session_start: new Date(),
  };
  return session_uuid;
}
function logoutUser(session_uuid: string) {
  delete sessions[session_uuid];
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/add_food", (req, res) => {
  const x: FoodLocationWithTime = req.body;
  console.log("/add_food received", req.body);
  x.time = new Date();
  food_locations.push(x);
  res.json(true);
});

function removeOldFoods() {
  const curr_time = new Date();
  curr_time.setHours(curr_time.getHours() + 4);
  while (0 < food_locations.length && curr_time < food_locations[0].time) {
    food_locations.shift();
  }
}

app.get("/get_food", (req, res) => {
  removeOldFoods();
  res.json(food_locations);
});

app.use("/static", express.static(path.join(__dirname, "../../static")));
app.use("/dist", express.static(path.join(__dirname, "../../dist")));

app.post("/login", (req, res) => {
  if (typeof(req.body) === "object" && typeof(req.body.username) === "string" && typeof(req.body.password) === "string") {
    const session_uuid = loginUser(req.body.username, req.body.password);
    if (session_uuid !== null) {
      res.cookie("session_uuid", session_uuid);
      res.json(true);
    }
  }
  res.json(false);
});

app.post("/register", (req, res) => {
  if (typeof(req.body) === "object" && typeof(req.body.username) === "string" && typeof(req.body.password) == "string" &&
    typeof(req.body.business_name) === "string" && typeof(req.body.address) === "string") {
    res.json(registerUser(req.body));
    return;
  }
  res.json(false);
});

app.get("/logout", (req, res) => {
  logoutUser(req.cookies.session_uuid);
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
