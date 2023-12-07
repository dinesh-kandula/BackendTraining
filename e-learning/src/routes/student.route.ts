import { Router } from "express";

import studentController from "../controllers/student.controller";
import { registerStudentSchema } from "../schemas/student.schema";
import {
  verifyStudentEmailNotExistsMiddleware,
  verifyStudentEmailExistsMiddleware,
} from "../middlewares/student.validator";

import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
import { verifyAdminEmailExistsMiddlewareAfterToken } from "../middlewares/admin.validator";

const route: Router = Router();

const studentRoute = () => {
  // Register Student
  route.post(
    "/register",
    registerStudentSchema,
    verifyStudentEmailNotExistsMiddleware,
    studentController.addStudent
  );

  // Login Student
  route.post(
    "/login",
    verifyStudentEmailExistsMiddleware,
    studentController.loginStudent
  );

  // After Logging the respective student details will be displayed
  route.get(
    "/current",
    verifyTokenMiddleware,
    studentController.getCurrentStudent
  );

  // Get the list of all the students [This is only accessable by Admins only.] 
  route.get(
    "/all",
    verifyTokenMiddleware,
    verifyAdminEmailExistsMiddlewareAfterToken,
    studentController.getStudents
  );

  // route.put(
  //   "/:id",
  //   updateStudentSchema,
  //   verifyStudentExistsMiddlewareWithIdInParams,
  //   studentController.updateStudent
  // );

  // route.delete(
  //   "/:id",
  //   verifyStudentExistsMiddlewareWithIdInParams,
  //   studentController.deleteStudent
  // );

  return route;
};

export default studentRoute;
