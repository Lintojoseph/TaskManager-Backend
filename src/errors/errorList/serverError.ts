import CustomError from "./customError";

export default class serverError extends CustomError{
    statusCode=500;
    error?: string | undefined;
    errorsList?: any[] | undefined;
    constructor({error,errors}:{error?:string; errors?:any[]}){
        super("INTERNAL_SERVER_ERROR")
        this.error=error;
        this.errorsList=errors;
        Object.setPrototypeOf(this,CustomError.prototype)
    }
}