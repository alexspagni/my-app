import { useDispatch, useSelector } from 'react-redux';
const filterResult=()=>{
    const images=useSelector((store: any)=>store?.images);
    const dispatch = useDispatch();
    
}