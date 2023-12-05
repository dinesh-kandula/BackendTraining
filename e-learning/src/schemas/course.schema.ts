import { body, ValidationChain } from "express-validator";

export const addCourseSchema: ValidationChain[] = [
  body("name")
    .notEmpty()
    .isString()
    .withMessage("Please enter the course name details")
    .isLength({ min: 4 })
    .withMessage("Please enter valid name with minimum of 4 characters")
    .trim(),

  body("duration")
    .notEmpty()
    .isNumeric()
    .withMessage(`Please enter the duration fo course in minutes`)
    .isFloat({ min: 0 })
    .withMessage("The number of minutes must be a postive")
    .custom((value) => {
      const num = parseInt(value);
      return num >= 5 && num <= 90;
    })
    .withMessage(
      "The duration of course range should be in between 5 to 90 minutes"
    ),
];
