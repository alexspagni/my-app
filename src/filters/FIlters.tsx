import {marsObject} from '../type/differentType'
export const hideImage=(element:marsObject, hides:marsObject[]):marsObject|undefined=>{
    let temp=0;
for(let i=0;i<hides.length;i++){
    if(element.id==hides[i].id){
        temp=1;
    }
}
if(temp==0){
    return element;
}


}