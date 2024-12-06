import FilterException from "../errors/errorList/filterException";
import { FilterPropertyOperators, getFilterProperty } from "./filterParams";

export const getFilterQuery=({
    queryParameters,
    filterFields,
    search,
    searchFields
}:{
    queryParameters:any;
    filterFields:string[];
    search?:string;
    searchFields:string[];

})=>{
    let query:any={};

    if(search){
        const searchQueryList=searchFields.map((field)=>{
            return { [field]: {$regx:search,$options:"i"}}
        });
        query.$or=searchQueryList;
    }
    for (const filterkey in queryParameters){
        const [filterValue,...filterOperators]=filterkey.split("__")
        if(filterOperators.length===0){
            throw new FilterException(`filter operator not provided`);
        }
        const filteroperator=getFilterProperty(filterOperators.join("__"))

        if(!filterFields.includes(filterValue)){
            throw new FilterException(`filter value  '${filterValue}'is invalid`)
        }

        if(!queryParameters[filterkey]){
            throw new FilterException(`provide a value for filter key`);
        }
        const propertyValue=String(queryParameters[filterkey]);

        switch(filteroperator){
            case FilterPropertyOperators.in:
                query={
                    ...query,
                    ...{
                        [filterValue]:{
                            $in:propertyValue.split(",").map((str)=>str.trim()),
                        }
                    }
                };
                break;
                case FilterPropertyOperators.eq:
                    query={ ...query,...{[filterValue]:propertyValue}};
                    break;
                case FilterPropertyOperators.not_eq:
                    query={...query,...{[filterValue]:{$ne:propertyValue}}}    
                    break;
                case FilterPropertyOperators.cont:
                    query={
                        ...query,
                        ...{ [filterValue]:{$in:[propertyValue]}},
                    }    
                    break;

                    default:
                        break;
        }
}   
return query;
}