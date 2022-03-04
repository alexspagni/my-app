import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,Button,Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

//import getApi from '../api/getApi';
const IndexScreen = ({navigation})=>{
const image=navigation.getParam("image");
    return (
       <View style={styles.container}> 
        <Text style={styles.TextStyle}>Image id:{image.id}</Text>
        <Text style={styles.TextStyle}>rover name: {image.rover.name}</Text>
        <Text style={styles.TextStyle}>camera name: {image.camera.name}</Text>
        </View>
    );
    
};


const styles=StyleSheet.create({
    container:{
        backgroundColor:'black',
        flex:1
    },
    TextStyle:{
        color:'white'
    }
});
export default IndexScreen;
