import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image, Button} from 'react-native';
import FormSearch from '../components/FormSearch';
type SerchScreenProp={
    navigation:any
}
const SerchScreen:React.FC<SerchScreenProp> =({navigation})=>{
    const [roverName,setRoverName]=useState<string>('');
    return (
        <View>
            <FormSearch term={roverName} 
            value="Insert rover Name" 
            onChangeText={(newTerm)=>{setRoverName(newTerm)}}
           
            />
        </View>
    );
}
const styles=StyleSheet.create({
 
});
export default SerchScreen;