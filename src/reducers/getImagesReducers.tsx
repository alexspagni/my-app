import {actionImageType,marsObject,nasaObject} from '../type/differentType'
const initalState: marsObject[] = [];

type LibrariesAddActionType ={
    type: typeof LIBRARIES_ADD,
    payload: marsObject
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
type LibrariesResetActionHide ={
    type: typeof LIBRARIES_HIDE_ONE,
    payload: marsObject,
}


export const addElementsToLibrariesMars = (array: marsObject[]): LibrariesAddActionTypeMars|undefined => {
    
    if(array.length){
        return {
            type: LIBRARIES_ADD_MARS,
            payload: array
        }
    }

}
export const addElementsToLibrariesMars2 = (array: marsObject[]): LibrariesAddActionTypeMars|undefined => {
    
    if(array.length){
        return {
            type: LIBRARIES_ADD,
            payload: array
        }
    }
    else{
        return {
            type: LIBRARIES_ADD,
            payload: []
        }
    }

}
export const addElementsToLibrariesHide = (object:marsObject): LibrariesResetActionHide => {
    return {
            type: LIBRARIES_HIDE_ONE,
            payload: object
        }
    
   
}
export type ActionFunction=typeof addElementsToLibrariesMars;
 type AllLibrariesAction = LibrariesAddActionType | LibrariesRemoveActionType |  LibrariesResetActionType|LibrariesAddActionTypeMars;
export const LIBRARIES_ADD :string= 'images_add'
export const LIBRARIES_ADD_MARS :string= 'images_add_mars'
export const LIBRARIES_REMOVE :string= 'images_remove'
export const LIBRARIES_RESET: string = 'images_clear'
export const LIBRARIES_HIDE_ONE: string = 'images_hide_one'

export const getImagesReducer = (state= initalState, action:AllLibrariesAction) => {
    switch(action.type){
        case LIBRARIES_ADD:
            return  action.payload;
        case LIBRARIES_RESET: 
            return []
        case LIBRARIES_REMOVE:
            //logica varia
            return state.pop();
        case LIBRARIES_ADD_MARS:
           // getImagesHided(state,addElementsToLibrariesMars(state))
            return [...state, ...(action.payload as marsObject[])];

        default:
            return state;
    }
}
type AllLibrariesActionHide = LibrariesResetActionHide;
export const getImagesHided = (state= initalState, action:AllLibrariesActionHide) => {
    switch(action.type){
        case LIBRARIES_HIDE_ONE:
            for(let i=0;i<state.length;i++){
                if(state[i].id==action.payload.id){
                    return state;
                }
            }
          return [...state,action.payload]
        default:
            return state;
    }

}