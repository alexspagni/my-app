import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image, Button} from 'react-native';
import FormSearch from '../components/FormSearch';

const SerchScreen:React.FC =()=>{
    //const [roverName,setRoverName]=useState<string>('');
    return (
        <View>
            <FormSearch/>
        </View>
    );
}
const styles=StyleSheet.create({
 
});
export default SerchScreen;