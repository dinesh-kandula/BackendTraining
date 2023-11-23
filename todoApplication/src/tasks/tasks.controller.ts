import { Request, Response } from "express";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validationResult } from "express-validator";
import { UpdateResult, DeleteResult } from "typeorm";

import { AppDataSource } from "../../index";
import { Task } from "../entity/tasks.entity";

class TasksController {
  // Get Method to get all the tasks
  public async getAll(req: Request, res: Response): Promise<Response> {
    // Declare a varibale to hold all tasks
    let allTasks: Task[];

    // Fetch all tasks using the repository
    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: "ASC",
        },
      });

      // Convert the tasks instance to an array of objects
      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);
    } catch (errors) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  }

  // Create a task method
  public async create(req: Request, res: Response): Promise<Response> {
    const erros = validationResult(req);

    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    // Get the content body from request object
    const { title, date, description, priority, status } = req.body;
    // Create a new instance of the task from the user request body
    const newTask = new Task();

    // Add the required properties to the task object
    newTask.title = title;
    newTask.date = date;
    newTask.description = description;
    newTask.priority = priority;
    newTask.status = status;

    // Add the new task to the database
    let createdTask: Task;
    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);
      return res.json(createdTask).status(201);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  }

  // Updating tasks method
  public async update(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    // Try to find if the task exists
    let task: Task | null;
    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });
      // Return 404 if the task is null
      if (!task) {
        return res
          .status(404)
          .json({ error: "The task with given id does not exist" });
      }
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }

    // Declare a varibale  for updatedTask
    let updatedTask: UpdateResult;

    // Update the task
    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        req.body.id,
        plainToInstance(Task, { status: req.body.status })
      );
      // Convert updated task into instance of an object
      updatedTask = instanceToPlain(updatedTask) as UpdateResult;
      return res.json(updatedTask).status(200);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  }

  // Delete Task Method
  public async delete(req: Request, res: Response): Promise<Response | void> {
    // Try to find if the task exists
    let task: Task | null;
    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.params.id },
      });
      // Return 404 if the task is null
      if (!task) {
        return res.status(404).json({
          error: "The task with given id does not exist or already deleted",
        });
      }
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }

    let deletedResult: DeleteResult;
    try {
      deletedResult = await AppDataSource.getRepository(Task).delete(task);
      return res.json(deletedResult).status(200);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  }
}

export const tasksController = new TasksController();
