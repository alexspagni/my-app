

const initialValue:boolean=true;
type loadingType={
    type:typeof LOADING_SET,
    payload:boolean
};
type formType={
    type:typeof FORM_SEARCH,
    payload:boolean
};
const LOADING_SET='set_loading';
type AllActionLoadingtype=loadingType;
/**
 * reducer used to set loding state to true o false in order to show GrawitazionalWave skeleton or not
 * 
 */
export const setLoadingReducer =(booleanValue:boolean)=>{
    return {
        type: LOADING_SET,
        payload:booleanValue
    };
};
export const LoadingReducer=(state=initialValue,action:AllActionLoadingtype)=>{
switch(action.type)
{
    case LOADING_SET:
        
        return action.payload;
    default :
    return state;
}
}
const FORM_SEARCH='set_search';
type AllActionSearchtype=formType;
/**
 * reducer used to set search state to true or false in order to make a new search or not.
 */
export const setSearchReducer =(booleanValue:boolean)=>{
    return {
        type: FORM_SEARCH,
        payload:booleanValue
    };
};
export const makeASearch=(state=initialValue,action:AllActionSearchtype)=>{
    switch(action.type)
    {
        case FORM_SEARCH:
            return action.payload;
        default :
        return state;
    }
    }