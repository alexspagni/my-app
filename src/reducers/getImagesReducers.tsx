import {actionImageType,marsObject,nasaObject} from '../type/differentType'
const initalState: any[] = [];

type LibrariesAddActionType ={
    type: typeof LIBRARIES_ADD,
    payload: nasaObject
}
type LibrariesAddActionTypeMars ={
    type: typeof LIBRARIES_ADD_MARS,
    payload: marsObject[]
}
type LibrariesRemoveActionType ={
    type: typeof LIBRARIES_REMOVE,
    payload: string,
}

type LibrariesResetActionType ={
    type: typeof LIBRARIES_RESET,
    payload: [],
}

export const addElementsToLibraries = (object: nasaObject): LibrariesAddActionType | undefined => {
    if(object.title.length){
        return {
            type: LIBRARIES_RESET,
            payload: object
        }
    } 
    return;
   
}
/*
export const addElementsToLibrariesMars = (array: marsObject[]): LibrariesAddActionTypeMars => {
    
        return {
            type: LIBRARIES_ADD_MARS,
            payload: array
        }
    
   
}* */
export const addElementsToLibrariesMars = (array: marsObject[]): LibrariesAddActionTypeMars |undefined=> {
    
    if(array.length){
        return {
            type: LIBRARIES_ADD_MARS,
            payload: array
        }
    }
    else{
        return{
            type: LIBRARIES_RESET,
            payload:[]
        }
    }
    return;

}
type AllLibrariesAction = LibrariesAddActionType | LibrariesRemoveActionType |  LibrariesResetActionType|LibrariesAddActionTypeMars;

export const LIBRARIES_ADD :string= 'images_add'
export const LIBRARIES_ADD_MARS :string= 'images_add_mars'
export const LIBRARIES_REMOVE :string= 'images_remove'
export const LIBRARIES_RESET: string = 'images_clear'

export const getImagesReducer = (state= initalState, action:AllLibrariesAction) => {
    switch(action.type){
        case LIBRARIES_ADD:
            //console.log(action.payload);
            return [...state, action.payload];
        case LIBRARIES_RESET: 
            return []
        case LIBRARIES_REMOVE:
            //logica varia
            return state.pop();
        case LIBRARIES_ADD_MARS:
            return action.payload
        default:
            return state;
    }

}