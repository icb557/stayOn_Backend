import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userController = new UserController();
export const userRouters = Router();

userRouters.get("/api/user", userController.getAllUsers);
userRouters.post("/api/user", userController.createUser);
userRouters.get("/api/user/:email", userController.getUser);
userRouters.put("/api/user/:email", userController.updateUser);
userRouters.delete("/api/user/:email", userController.deleteUser);
userRouters.post("/api/user/login", userController.login);
