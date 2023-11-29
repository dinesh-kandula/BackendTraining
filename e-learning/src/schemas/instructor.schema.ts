import { body, ValidationChain, param } from "express-validator";
import { Gender } from "../enums/gender";

export const createSchema: ValidationChain[] = [
  body("fullName")
    .notEmpty()
    .isString()
    .withMessage("Please enter the full name details")
    .isLength({ min: 4 })
    .withMessage("Please enter valid name with minum of 4 characters")
    .trim(),

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
];

export const updateSchema: ValidationChain[] = [
  param("id")
    .notEmpty()
    .isNumeric()
    .withMessage("Instructor should pass as path parameter and should be Numeric")
    .isFloat({ min: 0 })
    .withMessage("The number must be a postive"),

  body("fullName")
    .notEmpty()
    .isString()
    .withMessage("Please enter the valid Fullname")
    .isLength({ min: 4 })
    .withMessage("Please enter valid name with minum of 4 characters")
    .trim(),
];
