
const initalState = [];

export const LIBRARIES_ADD = 'images_add'

export const getImagesReducer = (state = initalState, action) => {
    switch(action.type){
        case LIBRARIES_ADD:
            console.log(action.payload);
            return [...state, action.payload];
        
        default:
            return state;
    }

}