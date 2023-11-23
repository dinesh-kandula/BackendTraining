import { Router } from "express";
import { tasksController } from "./tasks.controller";
import { createValidator, updateValidator } from "./tasks.validator";

// Fire the router functin
export const tasksRouter: Router = Router();

// Creata a default Taks Router
tasksRouter.get("/tasks", tasksController.getAll);

// Post(Create) Task Request API
tasksRouter.post("/tasks", createValidator, tasksController.create);

// Put(Update) Task Request API
tasksRouter.put("/tasks", updateValidator, tasksController.update);

// Delete Task Request API
tasksRouter.delete("/tasks/:id", tasksController.delete);
