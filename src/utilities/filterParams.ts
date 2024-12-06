import FilterException from "../errors/errorList/filterException";

export enum FilterPropertyOperators{
    eq,
    not_eq,
    in,
    cont,
}

export const getFilterProperty=(value:string)=>{
    switch(value){
        case "eq":
            return FilterPropertyOperators.eq;
        case "not_eq":
            return FilterPropertyOperators.not_eq;
        case "in":
            return FilterPropertyOperators.in;
        case "cont":
            return FilterPropertyOperators.cont;
        default:
            throw new FilterException(`filter option '${value}'not found`)                
    }
}