import { Router } from "express";

import adminController from "../controllers/admin.controller";
import { registerAdminSchema } from "../schemas/admin.schema";
import {
  verifyAdminEmailNotExistsMiddleware,
  verifyAdminEmailExistsMiddleware,
} from "../middlewares/admin.validator";

import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

const route: Router = Router();

const adminRoute = () => {
  //   Register Admin
  route.post(
    "/register",
    registerAdminSchema,
    verifyAdminEmailNotExistsMiddleware,
    adminController.addAdmin
  );

  // Login Admin
  route.post(
    "/login",
    verifyAdminEmailExistsMiddleware,
    adminController.loginAdmin
  );

  // get Current Admin
  route.get("/current", verifyTokenMiddleware, adminController.getCurrentAdmin);

  //   get list of admins
  route.get("/all", verifyTokenMiddleware, adminController.getAdmins);

  return route;
};

export default adminRoute;
