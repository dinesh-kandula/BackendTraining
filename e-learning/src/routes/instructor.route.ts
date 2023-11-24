import { Router } from "express";
import instructorController from "../controllers/instructor.controller";

const route: Router = Router();

const instructorRoute = () => {
  route.get("", instructorController.getInstructor);

  return route;
};

export default instructorRoute;
