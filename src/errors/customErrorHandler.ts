// import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
// import CustomError from "./errorList/customError";


// const CustomErrorHandler:ErrorRequestHandler = (
//   error: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log(error)
//   if (error instanceof CustomError) {
//     let errorResponse: {
//       success: false;
//       message: string;
//       error?: string;
//       errorsList?: any[];
//     } = {
//       success: false,
//       message: error.message,
//     };
//     if (error.error) {
//       errorResponse.error = error.error;
//     }
//     if (error.errorsList) {
//       errorResponse.errorsList = error.errorsList;
//     }
//      res.status(error.statusCode).json(errorResponse);
//   }

//    res.status(500).json({
//     success: false,
//     message: "INTERNAL_SERVER_ERROR",
//     error: "Something went wrong",
//   });
//   next(error)
// };

// export default CustomErrorHandler;

import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import CustomError from "./errorList/customError";

const CustomErrorHandler: ErrorRequestHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(error);

    // If headers are already sent, avoid further processing
    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof CustomError) {
        const errorResponse = {
            success: false,
            message: error.message,
            error: error.error,
            errorsList: error.errorsList || [],
        };
        res.status(error.statusCode).json(errorResponse); // Send response without `return`
        return; // Ensure nothing executes after this
    }

    // Default 500 Internal Server Error response
    res.status(500).json({
        success: false,
        message: "INTERNAL_SERVER_ERROR",
        error: "Something went wrong",
    });
    return; // Ensure nothing executes after this
};

export default CustomErrorHandler;
