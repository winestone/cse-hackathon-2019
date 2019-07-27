import request from "request";
import * as common from "../common/common";

function requestPromise(options: request.RequiredUriUrl & request.CoreOptions): Promise<[any, request.Response, any]> {
  return new Promise(resolve => {
    request(options, (err, res, body) => {
      resolve([err, res, body]);
    });
  });
}

(async () => {
  {
    console.log("Registering user1,pass1,bus1");
    const [err, res, body] = await requestPromise({
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
    });
    console.assert(body);
  }

  {
    console.log("Registering user1,pass1,bus12 should fail");
    const [err, res, body] = await request({
      uri: "http://localhost:8000/register",
      method: "POST",
      json: {
        username: "user1",
        password: "pass1",
        business_name: "bus12",
        location: {
          latitude: 55,
          longitude: 22,
        },
      } as common.UserAndPass,
    });
    console.assert(!body);
  }

  {
    console.log("Registering user12,pass1,bus1 should fail");
    const [err, res, body] = await request({
      uri: "http://localhost:8000/register",
      method: "POST",
      json: {
        username: "user12",
        password: "pass1",
        business_name: "bus1",
        location: {
          latitude: 55,
          longitude: 22,
        },
      } as common.UserAndPass,
    });
    console.assert(!body)
  }

  {
    console.log("Login user1,pass1"); 
    const [err, res, body] = await request({
      uri: "http://localhost:8000/login",
      method: "POST",
      json: {
        username: "user1",
        password: "pass1",
      } as common.UserAndPass,
    });
   
    console.assert(body);
    console.log(res.headers["set-cookie"]);
  }

})();





// request({
//   uri: "http://localhost:8000/food",
//   method: "POST",
//   json: {
//     description: "foods",
//     image: "picture", // base64 encoded png/jpeg?
//     urgency: "low",
//   } as common.AddFoodLocation,
// }, (err, res, body) => {
//   console.log("Test AddFoodLocation ");
//   console.assert(body);
//   console.log(body)
// });

// request({
//   uri: "http://localhost:8000/food",
//   method: "GET",
// }, (err, res, body) => {
//   console.log("Test GETFood location")
//   console.log(body);
// });

