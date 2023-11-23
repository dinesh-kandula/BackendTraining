import { AppDataSource } from "./data-source";
import express from "express";
import { Todo, getTodos } from "./entity/Todo.entity";
import Joi from "joi";

const app = express();
app.use(express.json());

const priorityConstants = ["HIGH", "MEDIUM", "LOW"];
const statusConstants = ["TO DO", "IN PROGRESS", "DONE"];

const todoRepository = AppDataSource.getRepository(Todo);

app.get("/todos/", async (req, res) => {
  const queryPara = req.query;

  let queryArray = [];
  for (const property in queryPara) {
    let value = queryPara[property];
    if (property !== "todo") {
      value = value.toUpperCase();
    }
    queryArray.push({ property: property, value: queryPara[property] });
  }

  let todos;
  if (queryArray.length === 0) {
    todos = await getTodos();
  } else {
    todos = await getTodos(queryArray);
  }
  res.send(todos);
});

app.get("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const todo = await todoRepository.findOneBy({ id: todoId });
  if (todo) res.send(todo);
  else res.status(404).send([]);
});

// Function to check the validation of todo body details
const checkPostValidations = (todoBody) => {
  const joiSchema = {
    todo: Joi.string().min(3).required(),
    priority: Joi.string().valid(...priorityConstants),
    status: Joi.string().valid(...statusConstants),
  };
  return Joi.validate(todoBody, joiSchema);
};

// API-3 Add todo api
app.post("/todos", async (req, res) => {
  const todoBody = req.body;
  const { todo, priority, status } = todoBody;
  const validations = checkPostValidations(todoBody);

  if (validations.error)
    return await res.status(400).send(validations.error.details[0].message);

  const todoObject = new Todo();
  todoObject.todo = todo;
  todoObject.priority = priority;
  todoObject.status = status;

  await todoRepository.save(todoObject);
  res.send("Saved a new todo with id: " + todoObject.id);
});

// AppDataSource.initialize()
//   .then(async () => {
//     console.log("Inserting a new todo into the database...");
//     const user = new Todo();
//     user.todo = "Buy Groceries";
//     user.priority = "High";
//     user.status = "Done";
//     await AppDataSource.manager.save(user);
//     console.log("Saved a new todo with id: " + user.id);

//     console.log("Loading todo's from the database...");
//     const todos = await AppDataSource.manager.find(Todo);
//     console.log("Loaded Todo's: ", todos);

//     console.log(
//       "Here you can setup and run express / fastify / any other framework."
//     );
//   })
//   .catch((error) => console.log(error));

app.listen(3003, () => console.log("Server Started and Running Port 3003"));
