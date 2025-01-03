import { body } from "express-validator";
import customValidator from "../../base/customValidator/customValidator";



export const updateDiscribtionValidator=[
    body("title")
    .custom(customValidator.isNotEmptyAndString)
    .bail()
    .isLength({max:100}),
    body("discription")
    .custom(customValidator.isNotEmptyAndString)
    .bail(),
    body("time").isISO8601()
]