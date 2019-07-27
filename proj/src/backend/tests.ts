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
    const [err, res, body] = await requestPromise({
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
    const [err, res, body] = await requestPromise({
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
    console.assert(!body);
  }

  const jar = request.jar();

  let sess1: string = "";
  {
    console.log("Login user1,pass1");
    const [err, res, body] = await requestPromise({
      uri: "http://localhost:8000/login",
      method: "POST",
      jar,
      json: {
        username: "user1",
        password: "pass1",
      } as common.UserAndPass,
    });

    console.assert(body);
    let cookies = res.headers["set-cookie"];
    console.log(cookies);
    console.assert(cookies !== undefined);
    if (cookies !== undefined) sess1 = cookies[0].substr(0, cookies[0].length - 8);
    console.log(`sess1 "${sess1}"`);
  }

  // jar.setCookie(sess1, "http://localhost:8000");
  console.log("string", jar.getCookieString("http://localhost:8000"));

  {
    console.log("Test AddFoodLocation ");
    const [err, res, body] = await requestPromise({
      uri: "http://localhost:8000/food",
      method: "POST",
      jar,
      // headers: {
      //   Cookie: request.cookie("session_uuid=asdf"),
      // },
      json: {
        description: "foods",
        image: "", // base64 encoded png/jpeg?
        urgency: "low",
      } as common.AddFoodLocation,
    });
    console.assert(body);
    console.log(body);
  }

  {
    console.log("Test GETFood location");
    const [err, res, body] = await requestPromise({
      uri: "http://localhost:8000/food",
      method: "GET",
    });
    console.log(body);
  }

})();





