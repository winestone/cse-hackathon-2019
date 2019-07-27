import * as common from "../common/common";

export type FoodLocations = {
  type: "loaded";
  food_locations: common.FoodLocation[];
} | {
  type: "loading";
};
