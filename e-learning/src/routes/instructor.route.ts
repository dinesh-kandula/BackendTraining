import { Router } from "express";
import instructorController from "../controllers/instructor.controller";
import { createSchema, updateSchema } from "../schemas/instructor.schema";
import {
  verifyInstructorEmailExistsMiddleware,
  verifyInstructorExistsMiddlewareWithParamId,
} from "../middlewares/instructor.validator";

const route: Router = Router();

const instructorRoute = () => {
  route.get("/:id", instructorController.getInstructorById);

  route.get("", instructorController.getInstructor);

  route.post(
    "",
    createSchema,
    verifyInstructorEmailExistsMiddleware,
    instructorController.createInstructor
  );

  route.put(
    "/:id",
    updateSchema,
    verifyInstructorExistsMiddlewareWithParamId,
    instructorController.updateInstructor
  );

  route.delete(
    "/:id",
    verifyInstructorExistsMiddlewareWithParamId,
    instructorController.deleteInstructor
  );

  return route;
};

export default instructorRoute;
