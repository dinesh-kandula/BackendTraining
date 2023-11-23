import { body, ValidationChain } from "express-validator";
import { Priority } from "../enums/Priority";
import { Status } from "../enums/Status";

export const createValidator: ValidationChain[] = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("The task title mandatory")
    .trim()
    .isString()
    .withMessage("Title needs to be in text format"),

  body("date")
    .not()
    .isEmpty()
    .withMessage("The Task Date is mandatory")
    .isString()
    .withMessage("The date needs to be a valid date format"),

  body("description")
    .trim()
    .isString()
    .withMessage("Description needs to be in text format"),

  body("priority")
    .trim()
    .isIn([Priority.high, Priority.low, Priority.medium])
    .withMessage(
      `Priority can only be ${Priority.low}, ${Priority.medium} & ${Priority.high}`
    ),

  body("status")
    .trim()
    .isIn([Status.done, Status.inProgress, Status.todo])
    .withMessage(
      `Status can only be ${Status.todo}, ${Status.inProgress}, ${Status.done}`
    ),
];
