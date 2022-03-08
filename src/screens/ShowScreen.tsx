import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,Button,Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
type IndexScreenType={
    navigation:any
}
//import getApi from '../api/getApi';
const IndexScreen :React.FC<IndexScreenType>= ({navigation})=>{
    const hides=useSelector((store: any)=>store?.imagesHide);
const image=navigation.getParam("image");
    return (
       <View style={styles.container}> 
        <Text style={styles.TextStyle}>Image id:{image.id}</Text>
        <Text style={styles.TextStyle}>Rover name: {image.rover.name}</Text>
        <Text style={styles.TextStyle}>Camera name: {image.camera.name}</Text>
        {hides.includes(image)?<Text style={styles.TextStyle}>This image has been hided</Text>:null}
        </View>
    );
    
};


const styles=StyleSheet.create({
    container:{
        backgroundColor:'#353839',
        flex:1
    },
    TextStyle:{
        color:'white'
    }
});
export default IndexScreen;
