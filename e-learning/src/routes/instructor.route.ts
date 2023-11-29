import { Router } from "express";
import instructorController from "../controllers/instructor.controller";
import { createSchema, updateSchema } from "../schemas/instructor.schema";
import {
  verifyInstructorEmailExistsMiddleware,
  verifyInstructorExistsMiddleware,
} from "../middlewares/instructor.validator";

const route: Router = Router();

const instructorRoute = () => {
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
    verifyInstructorExistsMiddleware,
    instructorController.updateInstructor
  );

  route.delete("",verifyInstructorExistsMiddleware, instructorController.deleteInstructor);

  return route;
};

export default instructorRoute;
