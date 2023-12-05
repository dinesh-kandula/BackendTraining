import { Router } from "express";
import courseController from "../controllers/course.controller";
import { addCourseSchema } from "../schemas/course.schema";
import { verifyInstructorExistsMiddlewareWithBodyId } from "../middlewares/instructor.validator";

const route: Router = Router();

const courseRoute = () => {
  // Get Course by Id
  route.get("/:id", courseController.getCourseById);

  // Get list of all courses
  route.get("", courseController.getAllCourses);

  // Add Course
  route.post(
    "",
    addCourseSchema,
    verifyInstructorExistsMiddlewareWithBodyId,
    courseController.addCourse
  );
  return route;
};

export default courseRoute;
