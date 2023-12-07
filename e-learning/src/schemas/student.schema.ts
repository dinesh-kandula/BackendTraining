import { body, ValidationChain, param } from "express-validator";
import { Gender } from "../enums/gender";

export const registerStudentSchema: ValidationChain[] = [
  body("fullName")
    .notEmpty()
    .isString()
    .withMessage("Please enter the full name details")
    .isLength({ min: 4 })
    .withMessage("Please enter valid name")
    .trim(),

  body("age")
    .notEmpty()
    .isNumeric()
    .withMessage("The value must be a number")
    .isFloat({ min: 0 })
    .withMessage("The number must be a postive")
    .custom((value) => {
      const num = parseInt(value);
      return num >= 15 && num <= 90;
    })
    .withMessage("The age should be in range of 15 and 90 years"),

  body("gender")
    .notEmpty()
    .trim()
    .isIn([Gender.female, Gender.male, Gender.other])
    .withMessage(
      `The Gender should be either ${Gender.female} or ${Gender.male} or ${Gender.other}`
    ),

  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Please Enter a valid Email id"),

  /*
    body("password")
    .notEmpty()
    .withMessage("Password should not be Empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .custom((value) => /[A-Z]/.test(value))
    .withMessage("Password must contain at least one uppercase letter")
    .custom((value) => /[a-z]/.test(value))
    .withMessage("Password must contain at least one lowercase letter")
    .custom((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value))
    .withMessage("Password must contain at least one special character"),
    */
  body("password")
    .notEmpty()
    .withMessage("Password should not be empty!")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[@#$%&*.]/)
    .withMessage("Password must contain at least one special character"),
];

export const updateStudentSchema: ValidationChain[] = [
  param("id")
    .notEmpty()
    .isNumeric()
    .withMessage("Student should pass as path parameter and should be Numeric")
    .isFloat({ min: 0 })
    .withMessage("The number must be a postive"),

  body("fullName")
    .notEmpty()
    .isString()
    .withMessage("Please enter the full name details")
    .isLength({ min: 4 })
    .withMessage("Please enter valid name")
    .trim(),
];
