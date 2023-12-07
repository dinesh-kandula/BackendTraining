import dotenv from "dotenv";
import { Request } from "express";
import { UpdateResult, DeleteResult } from "typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import { AppDataSource } from "../data-source";
import { Student } from "../entities/student.entity";
import { Gender } from "../enums/gender";
import { ExtendedRequest } from "../enums/email-payload";

dotenv.config();

type StudentRegisterType = {
  fullName: string;
  email: string;
  password: string;
  age: number;
  gender: string;
};

type StudentLoginType = {
  email: string;
  password: string;
};

class StudentSerivce {
  createStudent = async (
    req: Request
  ): Promise<{
    id: number;
    fullName: string;
    email: string;
    age: number;
    gender: Gender;
  }> => {
    try {
      const { fullName, email, password, age, gender }: StudentRegisterType =
        req.body;
      // Define Repository and Entity Instance
      const studentRepository = AppDataSource.getRepository(Student);
      const studentEntity = new Student();

      // Assign values to the instance of students from the request
      studentEntity.fullName = fullName;
      studentEntity.email = email;
      studentEntity.age = age;

      // Map gender input to the corresponding enum value
      switch (gender.toUpperCase()) {
        case "M":
          studentEntity.gender = Gender.male;
          break;
        case "F":
          studentEntity.gender = Gender.female;
          break;
        default:
          studentEntity.gender = Gender.other;
          break;
      }

      // Hashing the password
      const saltRounds: number = 10; // Generate a salt
      const salt: string = bcrypt.genSaltSync(saltRounds); // Cost factor for the bcrypt algorithm
      const hashedPassword: string = bcrypt.hashSync(password, salt); //Converting Normal password to Hashed Password

      studentEntity.passsword = hashedPassword;
      studentEntity.salt = salt;

      // Save in the Repository
      const savedStudent = await studentRepository.save(studentEntity);

      return {
        id: savedStudent.id,
        fullName: savedStudent.fullName,
        email: savedStudent.email,
        age: savedStudent.age,
        gender: savedStudent.gender,
      };
    } catch (error) {
      console.error("Error Registering student:", error);
      throw error;
    }
  };

  loginStudent = async (
    req: Request
  ): Promise<{ message: string; result: boolean; jwtToken: string }> => {
    try {
      const { email, password }: StudentLoginType = req.body;
      const studentRepository = AppDataSource.getRepository(Student);
      const studentEntity: Student | null = await studentRepository.findOne({
        where: { email },
      });

      if (studentEntity) {
        const passwordMatch = bcrypt.compareSync(
          password,
          studentEntity.passsword
        );
        if (passwordMatch) {
          const payload = { email, id: studentEntity.id };
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
          message: "Student doesn't exsist",
          result: false,
          jwtToken: "",
        };
      }
    } catch (error) {
      console.error("Error Logging student:", error);
      return { message: "Error Logging Student", result: false, jwtToken: "" };
    }
  };

  getCurrentStudentByEmail = async (req: ExtendedRequest): Promise<Student> => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const student = await studentRepository
        .createQueryBuilder("student")
        .select([
          "student.id",
          "student.fullName",
          "student.email",
          "student.age",
          "student.gender",
        ])
        .where({ email: req.email })
        .getOne();

      if (student === null) {
        throw `No student found with given Student email ${req.email}`;
      }
      return student;
    } catch (error) {
      console.error(
        `Error getting current student with id ${req.email}:`,
        error
      );
      throw error;
    }
  };

  getCurrentStudentById = async (id: number): Promise<Student> => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const student = await studentRepository.findOneBy({ id: id });
      if (student === null) {
        console.log("No Id found with given Student Id");
        throw "No Id found with given Student Id";
      } else {
        return student;
      }
    } catch (error) {
      console.error(`Error getting current student with id ${id}:`, error);
      throw error;
    }
  };

  getStudents = async (): Promise<Student[]> => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const students = await studentRepository
        .createQueryBuilder("student")
        .select([
          "student.id",
          "student.fullName",
          "student.email",
          "student.age",
          "student.gender",
        ])
        .getMany();
      return students;
    } catch (error) {
      console.error(`Error Getting all students data`, error);
      throw error;
    }
  };

  updateStudent = async (
    id: number,
    fullName: string
  ): Promise<UpdateResult> => {
    let updateStudent: UpdateResult;
    try {
      // Define Repository and Entity Instance
      const studentRepository = AppDataSource.getRepository(Student);
      updateStudent = await studentRepository
        .createQueryBuilder()
        .update()
        .set({ fullName: fullName })
        .where("id = :id", { id: id })
        .execute();
      return updateStudent;
    } catch (error) {
      console.error(`Error updating student with id ${id}:`, error);
      throw error;
    }
  };

  deleteStudent = async (id: number) => {
    try {
      const studentRepository = AppDataSource.getRepository(Student);
      const studentEntity = await this.getCurrentStudentById(id);

      const deletedStudent: DeleteResult = await studentRepository.delete(
        studentEntity
      );
      return deletedStudent;
    } catch (error) {
      console.error(`Error Deleting student with id ${id}:`, error);
      throw error;
    }
  };
}

export default new StudentSerivce();
