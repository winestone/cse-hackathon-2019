
export type Urgency = "low" | "med" | "high";

export interface Location {
  longitude: number;
  latitude: number;
}

export interface UserAndPass {
  username: string;
  password: string;
}

export interface User {
  username: string;
  password: string;
  business_name: string;
  location: Location;
}

export interface AddFoodLocation {
  description: string;
  image: string; // base64 encoded png/jpeg?
  urgency: Urgency;
}

export interface FoodLocation {
  id: number;
  business_name: string;
  location: Location;
  description: string;
  urgency: Urgency;
  image: string; // base64 encoded png/jpeg?
}

export interface FoodCancel {
  id: number;
}

/*
  POST /register
    - body: User
    - returns: boolean, true if successful
  POST /login
    - body: UserAndPass
    - returns: boolean, true if successful, also sets the "session_uuid" cookie
  POST /logout
    - body: ignored
    - returns: nothing
  POST /food
    - body: AddFoodLocation
    - returns: nothing
  GET  /food
    - body: ignored
    - returns: array of FoodLocation
  GET  /food/self
    - body: ignored
    - returns: array of FoodLocation belonging to yourself
  POST /food/cancel
    - body: FoodCancel
    - returns: nothing
*/

export function validateUrgency(x: any): x is Urgency {
  return ["low", "med", "high"].includes(x);
}

export function validateLocation(x: any): x is Location {
  return (typeof(x.longitude) === "number" && typeof(x.latitude) === "number");
}

export function validateUserAndPass(x: any): x is UserAndPass {
  return (typeof(x.username) === "string" && typeof(x.password) === "string");
}

export function validateUser(x: any): x is User {
  return (typeof(x.username) === "string" && typeof(x.password) === "string" && typeof(x.business_name) === "string" &&
    validateLocation(x.location));
}

export function validateAddFoodLocation(x: any): x is AddFoodLocation {
  return ( typeof(x.description) === "string" && typeof(x.image) === "string" && typeof(x.urgency) === "string");
}

export function validateFoodLocation(x: any): x is FoodLocation {
  return (typeof(x.id) === "number" && typeof(x.business_name) === "string" && validateLocation(x.location) &&
    typeof(x.description) === "string" && validateUrgency(x.urgency) && typeof(x.image) === "string");
}

export function validateFoodCancel(x: any): x is FoodCancel {
  return (typeof(x.id) === "string");
}
