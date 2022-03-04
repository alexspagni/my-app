import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {getImageApi,getImageMars} from '../api/getImage'; 
import { addElementsToLibraries,addElementsToLibrariesMars } from '../reducers/getImagesReducers';
import PhotoComponent from '../components/PhotoComponent';
import SearchBar from '../components/SearchBar';

const IndexScreen: React.FC= ({ navigation }: any)=>{
    const images=useSelector((store: any)=>store?.images);
    const dispatch = useDispatch();
    const [term,setTerm]=useState<string>('');
/*
    const getImage = async () => {
        const results= await getImageApi();
        console.log(results);
        
        dispatch(addElementsToLibraries(results))
    }
    useEffect( () => {
        getImage();
       // console.log(results);
        
    },[])
    */
    const getImageFromMars = async () => {
        const results= await getImageMars();
        //console.log(results);
        dispatch({
            type:'images_add_mars',
            payload:results
        })
      // dispatch({addElementsToLibrariesMars(results)})
    }
    useEffect( () => {
        getImageFromMars();
       // console.log(results);
        
    },[])
    return (
       <View > 
        <SearchBar term={term}  onTermChange={(newTerm:string)=>setTerm(newTerm)}/>
        <FlatList
           data={images}
           keyExtractor={(item)=>item.id}
           renderItem ={({item})=>
           <View style={styles.Container}>
            <TouchableOpacity onPress={()=>navigation.navigate('Show',{image:item})}>  
                <PhotoComponent object={item}/>
            </TouchableOpacity>
           </View>
           }
           
           />
          
        </View>
    );
    
};


const styles=StyleSheet.create({
    Container :{
        marginBottom:10,
        alignItems:'center'
        
    }
});
export default IndexScreen;
