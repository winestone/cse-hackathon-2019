// lib/app.ts
import express from "express";
import path from "path";
import * as common from "../common/common"

// Create a new express application instance
const app: express.Application = express();

type FoodLocationWithTime = common.AddFoodLocation & { time: Date };

const food_locations: FoodLocationWithTime[] = [];

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
    console.log("hi");
    food_locations.shift();
  }
}
app.get("/get_food", (req, res) => {
  removeOldFoods();
  res.json(food_locations);
});

app.use("/static", express.static(path.join(__dirname, "../../static")));
app.use("/dist", express.static(path.join(__dirname, "../../dist")));

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});
