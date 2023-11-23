import { Request, Response, Router } from "express";
import { TasksController } from "./tasks.controller";
import { createValidator } from "./tasks.validator";
import { validationResult } from "express-validator";

// Fire the router functin
export const tasksRouter: Router = Router();

// Creata a default Taks Router
tasksRouter.get("/tasks", async (req: Request, res: Response) => {
  const taskController = new TasksController();
  const allTasks = await taskController.getAll();
  res.json(allTasks).status(200);
});

// Post Request API
tasksRouter.post(
  "/tasks",
  createValidator,
  //   @ts-ignore
  async (req: Request, res: Response) => {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
  }
);
