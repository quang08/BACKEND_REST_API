import express from "express";
import { isAuthenticated } from "../middlewares";
import { deleteUser, getAllUsers, updateUser } from "../controllers/users";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, deleteUser);
  router.patch("/users/:id", isAuthenticated, updateUser);
};
