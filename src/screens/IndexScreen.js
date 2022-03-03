import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image} from 'react-native';
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
    return (
       <View> 
        <Text>here there are all images</Text>
        <FlatList
           data={images}
           keyExtractor={(item)=>item.title}
           renderItem ={({item})=>
           <TouchableOpacity
           onPress={()=>navigation.navigate('Show',{image:item})}
           >
           <Image source={{uri:item.url}} style={styles.image}/>
           </TouchableOpacity>
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
