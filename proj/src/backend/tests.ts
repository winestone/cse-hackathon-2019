import request from "request";
import * as common from "../common/common";

console.log("Registering user1,pass1");
request({
  uri: "http://localhost:8000/register",
  method: "POST",
  json: {
    username: "user1",
    password: "pass1",
    business_name: "bus1",
    location: {
      latitude: 55,
      longitude: 22,
    },
  } as common.User,
}, (err, res, body) => {
  console.assert(body);
});

console.log("Registering user1,pass1");
request({
  uri: "http://localhost:8000/login",
  method: "POST",
  json: {
    username: "user1",
    password: "pass1",
  } as common.UserAndPass,
}, (err, res, body) => {
  console.assert(!body);
  console.log(res.headers["set-cookie"]);
});

console.log("Login user1,pass1");
request({
  uri: "http://localhost:8000/login",
  method: "POST",
  json: {
    username: "user1",
    password: "pass1",
  } as common.UserAndPass,
}, (err, res, body) => {
  console.assert(body);
  console.log(res.headers["set-cookie"]);
});
