import { InitialState } from "@react-navigation/native";

const initialValue:boolean=true;
type loadingType={
    type:typeof LOADING_SET,
    payload:boolean
};
const LOADING_SET='set_loading';
type AllActionLoadingtype=loadingType;
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
        const returValue=action.payload;
        return returValue;
    default :
    return state;
}
}