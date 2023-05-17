//router: responsible for routing and mapping the incoming requests to the appropriate controllers or request handlers. The controller focuses on the request processing and response generation, while the router focuses on the routing and endpoint definition.

//POST request is made to a specific endpoint, the request first goes through the router and then reaches the controller associated with that endpoint.

import { login, register } from "../controllers/authentication";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/register/", register);
  router.post("/auth/login/", login);
};
