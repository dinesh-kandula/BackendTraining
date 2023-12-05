import { Express } from "express";

import studentRoute from "./student.route";
import instructorRoute from "./instructor.route";
import courseRoute from "./course.route";

import courseInstructorController from "../controllers/course-instructor.controller";

import { verifyInstructorExistsMiddleware } from "../middlewares/course-instructor.validator";

const registerRoutes = (app: Express) => {
  app.use("/student", studentRoute());
  app.use("/instructor", instructorRoute());
  app.use("/course", courseRoute());

  // Fetch all the courses that are being taught by “instructorId”.
  app.get(
    "/instructor/:instructorId/course",
    verifyInstructorExistsMiddleware,
    courseInstructorController.getCoursesTaughtByInstructor
  );
};
export default registerRoutes;
