import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,Button,Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import getImage from '../api/getImage'; 
//import getApi from '../api/getApi';
const IndexScreen = ({navigation})=>{
    //const [images, setImages] = useState([])
    const images=useSelector((store)=>store.images);
    const dispatch = useDispatch();

    useEffect(async () => {
        const results= await getImage();
       // console.log(results);
        dispatch({
          type:'images_add' ,
          payload : results
        })
    },[])
    /*
    const variabile=useSelector((store)=>store.getImagesReducer);
    const dispatch = useDispatch();

    const addBook = (number) => {
        dispatch({
            type: LIBRARIES_ADD,
            payload: number
        })
    }
    const resolveImages = async () =>  {
        const results= await getImage();
        setImages(prev => ([...prev,results]));
    }
    
    //vado ad effettuare la richiesta get alle API della nasa
    useEffect(() => {
        resolveImages();
    },[])
   */
    return (
       <View> 
        <Text>here there are all images</Text>
        <FlatList
           data={images}
           keyExtractor={(item)=>item.title}
           renderItem ={({item})=>
           <Image source={{uri:item.url}} style={styles.image}/>
           }
           />
        </View>
    );
    
};


const styles=StyleSheet.create({
    image: {
        width: 250,
        height : 120,
        borderRadius:4
        
      }
});
export default IndexScreen;
/*
<Image source={{uri:item.url}} style={styles.image}/>
const variabile=useSelector((store)=>store.libraries);
    const dispatch = useDispatch();

    const addBook = (number) => {
        dispatch({
            type: LIBRARIES_ADD,
            payload: number
        })
    }*/
//<Button title='add book' onPress={() => addBook(Math.random() * 200)} />