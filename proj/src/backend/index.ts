// lib/app.ts
import express from "express";
import path from "path";
import * as common from "../common/common"
import { stringify } from "querystring";

// Create a new express application instance
const app: express.Application = express();

type FoodLocationWithTime = common.AddFoodLocation & { time: Date };

const food_locations: FoodLocationWithTime[] = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/add_food", (req, res) => {
  console.log(req.body);
  const x: FoodLocationWithTime = req.body;
  food_locations.push(x);
  res.send("Hello World!");
});

app.get("/get_food", (req, res) => {
  res.send(JSON.stringify(food_locations))
});

app.use("/static", express.static(path.join(__dirname, "../../static")));
app.use("/dist", express.static(path.join(__dirname, "../../dist")));

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
