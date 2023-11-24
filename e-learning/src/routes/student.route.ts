import { Router } from "express";

import studentController from "../controllers/student.controller";

const route: Router = Router();

const studentRoute = () => {
  route.get("", studentController.getStudents);

  return route;
};

export default studentRoute;
