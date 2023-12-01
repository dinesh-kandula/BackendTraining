import { Router } from "express";
import courseController from "../controllers/course.controller";
// import { createSchema, updateSchema } from "../schemas/instructor.schema";

const route: Router = Router();

const courseRoute = () => {
  route.get("/:id", courseController.getCourse);
  route.get("", courseController.getAllCourses);
  return route;
};

export default courseRoute;
