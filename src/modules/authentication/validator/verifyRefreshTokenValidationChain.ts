import { body } from "express-validator";
import customValidator from "../../base/customValidator/customValidator";

export const VerifyRefreshTOkenValidation=[
    body("refreshToken").custom(customValidator.isNotEmptyAndString),
]