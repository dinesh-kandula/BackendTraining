import { body, ValidationChain } from "express-validator";

export const registerAdminSchema: ValidationChain[] = [
  body("fullName")
    .notEmpty()
    .isString()
    .withMessage("Please enter the full name details")
    .isLength({ min: 4 })
    .withMessage("Please enter valid name")
    .trim(),

  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Please Enter a valid Email id"),

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

// export const updateStudentSchema: ValidationChain[] = [
//   param("id")
//     .notEmpty()
//     .isNumeric()
//     .withMessage("Student should pass as path parameter and should be Numeric")
//     .isFloat({ min: 0 })
//     .withMessage("The number must be a postive"),

//   body("fullName")
//     .notEmpty()
//     .isString()
//     .withMessage("Please enter the full name details")
//     .isLength({ min: 4 })
//     .withMessage("Please enter valid name")
//     .trim(),
// ];
