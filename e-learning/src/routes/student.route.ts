import { Router } from "express";

import studentController from "../controllers/student.controller";
import { createSchema, updateSchema } from "../schemas/student.schema";
import {
  verifyStudentEmailExistsMiddleware,
  verifyStudentExistsMiddleware,
} from "../middlewares/student.validator";

const route: Router = Router();

const studentRoute = () => {
  route.get("", studentController.getStudents);

  route.post(
    "",
    createSchema,
    verifyStudentEmailExistsMiddleware,
    studentController.addStudent
  );

  route.put(
    "/:id",
    updateSchema,
    verifyStudentExistsMiddleware,
    studentController.updateStudent
  );

  route.delete("/:id", verifyStudentExistsMiddleware, studentController.deleteStudent);

  return route;
};

export default studentRoute;
