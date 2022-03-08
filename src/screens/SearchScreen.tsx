import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image, Button} from 'react-native';
import FormSearch from '../components/FormSearch';

const SerchScreen:React.FC =()=>{

    return (
        <View>
            <FormSearch/>
        </View>
    );
}
const styles=StyleSheet.create({
 
});
export default SerchScreen;