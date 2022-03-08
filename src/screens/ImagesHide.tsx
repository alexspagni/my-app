
/**
 * NOT USE ANYMORE
 */

import React from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity} from 'react-native';
import {  useSelector } from 'react-redux';
import PhotoComponent from '../components/PhotoComponent';
const ImagesHide=()=>{
    const images=useSelector((store: any)=>store?.imagesHide);
    //console.log(images);
    
    return (
        <View>
            <FlatList
            data={images}
           keyExtractor={(item)=>item.id}
           renderItem ={({item})=>
            <PhotoComponent object={item}/>
           }
           />
        </View>
    );
}

export default ImagesHide