// lib/app.ts
import express from "express";
import path from "path";
import * as common from "../common/common"

// Create a new express application instance
const app: express.Application = express();

type FoodLocationWithTime = common.AddFoodLocation & { time: Date };

const food_locations: FoodLocationWithTime[] = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/add_food", (req, res) => {
  console.log(req.body);
  const x: FoodLocationWithTime = JSON.parse(req.body);
  x.time = new Date();
  food_locations.push(x);
  res.send("Hello World!");
});

function removeOldFoods() {
  const curr_time = new Date(); 
  while (0 < food_locations.length && food_locations[0].time < curr_time) {
    food_locations.unshift();
  }
}

app.use("/static", express.static(path.join(__dirname, "../../static")));
app.use("/dist", express.static(path.join(__dirname, "../../dist")));

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
