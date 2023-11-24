import { Express } from "express";

import studentRoute from "./student.route";
import instructorRoute from "./instructor.route";

const registerRoutes = (app: Express) => {
  app.use("/student", studentRoute());
  app.use("/instructor", instructorRoute());
};
export default registerRoutes;
