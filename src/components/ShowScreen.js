import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,Button,Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

//import getApi from '../api/getApi';
const IndexScreen = ({navigation})=>{
const image=navigation.getParam("image");
    return (
       <View> 
        <Text>Image title:{image.title}</Text>
        <Text>Image explanation: {image.explanation}</Text>
        <Text>Image date: {image.date}</Text>
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
