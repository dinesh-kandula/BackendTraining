import { Request, Response } from "express";
import { validationResult } from "express-validator";

import adminService from "../services/admin.service";
import { Admin } from "../entities/admin.entity";
// import { UpdateResult } from "typeorm";
import { ExtendedRequest } from "../enums/email-payload";

class AdminController {
  addAdmin = async (req: Request, res: Response): Promise<Response> => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ erros: result.array() });
    }
    let newAdmins: {};

    try {
      newAdmins = await adminService.createAdmin(req);
      return res.json(newAdmins).status(201);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };

  loginAdmin = async (req: Request, res: Response): Promise<Response> => {
    try {
      const loginResult: {
        message: string;
        result: boolean;
      } = await adminService.loginAdmin(req);

      if (loginResult.result) {
        return res.status(200).json(loginResult);
      } else {
        return res.status(401).json(loginResult);
      }
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };

  getCurrentAdmin = async (req: ExtendedRequest, res: Response) => {
    let admin: Admin;
    try {
      admin = await adminService.getCurrentAdminByEmail(req);
      return res.status(200).json(admin);
    } catch (error) {
      return res.json({ error: `Internal Server Error ${error}` }).status(500);
    }
  };

  getAdmins = async (req: Request, res: Response): Promise<Response> => {
    let admin: Admin[];
    try {
      admin = await adminService.getAllAdmins();
      return res.status(200).json(admin);
    } catch (error) {
      return res.json({ error: "Internal Server Error" }).status(500);
    }
  };
}

export default new AdminController();
