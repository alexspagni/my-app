import { useRoute } from '@react-navigation/native';
import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,Button,Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
type IndexScreenType={
    navigation:any
}
const ShowScreen :React.FC<IndexScreenType>= (props)=>{
    const hides=useSelector((store: any)=>store?.imagesHide);
    console.log(props);
    //Hook per andare a prendere il parametro che mi è stato passato da IndexScreen
    const route=useRoute()
    const image=(route.params as any)?.image;
    return (
       <View style={styles.container}> 
        <Text style={styles.TextStyle}>Image id:{image?.id}</Text>
        <Text style={styles.TextStyle}>Rover name: {image?.rover.name}</Text>
        <Text style={styles.TextStyle}>Camera name: {image?.camera.name}</Text>
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
export default ShowScreen;
