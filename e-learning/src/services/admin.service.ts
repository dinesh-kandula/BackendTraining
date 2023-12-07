import dotenv from "dotenv";
import { Request } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { AppDataSource } from "../data-source";
import { Admin } from "../entities/admin.entity";
import { ExtendedRequest } from "../enums/email-payload";

dotenv.config();

type AdminRegisterType = {
  fullName: string;
  email: string;
  password: string;
};

type AdminLoginType = {
  email: string;
  password: string;
};

class AdminSerivce {
  createAdmin = async (req: Request) => {
    try {
      const { fullName, email, password }: AdminRegisterType = req.body;
      // Define Repository and Entity Instance
      const adminRepository = AppDataSource.getRepository(Admin);
      const adminEntity = new Admin();

      // Assign values to the instance of admins from the request
      adminEntity.fullName = fullName;
      adminEntity.email = email;

      // Hashing the password
      const saltRounds: number = 10; // Generate a salt
      const salt: string = bcrypt.genSaltSync(saltRounds); // Cost factor for the bcrypt algorithm
      const hashedPassword: string = bcrypt.hashSync(password, salt); //Converting Normal password to Hashed Password

      adminEntity.passsword = hashedPassword;
      adminEntity.salt = salt;

      // Save in the Repository
      const savedAdmin = await adminRepository.save(adminEntity);

      return {
        id: savedAdmin.id,
        fullName: savedAdmin.fullName,
        email: savedAdmin.email,
      };
    } catch (error) {
      console.error("Error Registering admin:", error);
      throw error;
    }
  };

  loginAdmin = async (
    req: Request
  ): Promise<{ message: string; result: boolean; jwtToken: string }> => {
    try {
      const { email, password }: AdminLoginType = req.body;
      const adminRepository = AppDataSource.getRepository(Admin);
      const adminEntity: Admin | null = await adminRepository.findOne({
        where: { email },
      });

      if (adminEntity) {
        const passwordMatch = bcrypt.compareSync(
          password,
          adminEntity.passsword
        );
        if (passwordMatch) {
          const payload = { email, id: adminEntity.id };
          const secretKey = String(process.env.MY_SECRET_KEY);
          if (secretKey) {
            const jwtToken = jwt.sign(payload, secretKey);
            return { message: "Login Sucessfull", result: true, jwtToken };
          } else {
            return {
              message: "Login Unsucessfull",
              result: false,
              jwtToken: "",
            };
          }
        } else {
          return {
            message: "Password Incorrect",
            result: false,
            jwtToken: "",
          };
        }
      } else {
        return {
          message: "Admin doesn't exsist",
          result: false,
          jwtToken: "",
        };
      }
    } catch (error) {
      console.error("Error Logging admin:", error);
      return { message: "Error Logging Admin", result: false, jwtToken: "" };
    }
  };

  getCurrentAdminByEmail = async (req: ExtendedRequest): Promise<Admin> => {
    try {
      const adminRepository = AppDataSource.getRepository(Admin);
      const admin = await adminRepository
        .createQueryBuilder("admin")
        .select(["admin.id", "admin.fullName", "admin.email"])
        .where({ email: req.email })
        .getOne();

      if (admin === null) {
        throw `No admin found with given Admin email ${req.email}`;
      }
      return admin;
    } catch (error) {
      console.error(`Error getting current admin with email id ${req.email}:`, error);
      throw error;
    }
  };

  getAllAdmins = async (): Promise<Admin[]> => {
    try {
      const adminRepository = AppDataSource.getRepository(Admin);
      const admins = await adminRepository
        .createQueryBuilder("admin")
        .select(["admin.id", "admin.fullName", "admin.email"])
        .getMany();
      return admins;
    } catch (error) {
      console.error(`Error getting list of all admins`, error);
      throw error;
    }
  };
}

export default new AdminSerivce();
