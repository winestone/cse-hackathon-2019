
type Urgency = "low" | "med" | "high";

export interface Location {
  longitude: string,
  latitude: string,
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
    - returns: boolean, true if successful, also sets the 'session_uuid' cookie
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

function validateUrgency(x: any): x is Urgency {
  return ["low", "med", "high"].includes(x);
}

function validateLocation(x: any): x is Location {
  return (typeof(x.longitude) == 'string' && typeof(x.latitude) == 'string');
}

function validateUserPass(x: any): x is UserAndPass {
  return (typeof(x.username) == 'string' && typeof(x.password) == 'string');
}

function validateUser(x: any): x is User {
  return (typeof(x.username) == 'string' && typeof(x.password) == 'string' && typeof(x.business_name) == 'string' &&
    validateLocation(x.location));
}

function validateAddFoodLocation(x: any): x is AddFoodLocation {
  return ( typeof(x.description) == 'string' && typeof(x.image) == 'string');
}

function validateFoodLocation(x: any): x is FoodLocation {
  return (typeof(x.id) == 'number' && typeof(x.business_name) == 'string' && validateLocation(x.location) &&
    typeof(x.description) == 'string' && validateUrgency(x.urgency) && typeof(x.image) == 'string');
}

function validateFoodCancel(x: any): x is FoodCancel {
  return (typeof(x.id) == 'string');
}