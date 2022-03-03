
const initalState = [1];

export const LIBRARIES_ADD = 'libraries_add'

export const librariesReducer = (state = initalState, action) => {
    switch(action.type){
        case LIBRARIES_ADD:
            return [...state, action.payload]
        
        default:
            return state;
    }

}