import React, { useState } from 'react';
import { View, TextInput, StyleSheet,Text, Button } from 'react-native';
import {getImageMars} from '../api/getImage';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProvider, withNavigation } from 'react-navigation';
import { addElementsToLibrariesMars } from '../reducers/getImagesReducers';
import SearchImputText from './SearchImputText'
type FormProps={
  navigation:any
}
const FormSearch: React.FC<FormProps>= ({navigation}) => {
  
  const [roverName,setRoverName]=useState<string>('');
  const [day,setDay]=useState<string>('');
  const [month,setMonth]=useState<string>('');
  const [year,setYear]=useState<string>('');
  const images=useSelector((store: any)=>store?.images);
  const dispatch = useDispatch();
        const getImageFromMars = async () => {
          if(day && month &&year){
            const results= await getImageMars(roverName,day,month,year);
            dispatch(dispatch(addElementsToLibrariesMars(results)))
          }
          else{
            const results= await getImageMars(roverName);
            dispatch(dispatch(addElementsToLibrariesMars(results)))
          }
          navigation.navigate('Index');
    }
  return (
  
    <View style={styles.backgroundStyle}>
      <Text style={styles.TextStyle}>Insert Rover Name</Text>
     <SearchImputText  
     term={roverName} 
     value="Insert rover Name" 
     onChangeText={(newTerm)=>setRoverName(newTerm) }/>
    <Text style={styles.TextStyle}>Insert Year you want to search</Text>
    <View style={styles.ImputTextContainer}>
      <SearchImputText  
      term={day} 
      value="Insert day" 
      onChangeText={(newTerm)=>setDay(newTerm) }/>
      <SearchImputText  
      term={month} 
      value="Insert month" 
      onChangeText={(newTerm)=>setMonth(newTerm) }/>
      <SearchImputText  term={year} 
      value="Insert Year" 
      onChangeText={(newTerm)=>setYear(newTerm) }/>
     </View>
     <Button title='Search photo' onPress={()=>getImageFromMars()
     }/>
   </View>
 );
};

const styles = StyleSheet.create({
 backgroundStyle: {
  
   borderColor:'black',
   borderWidth:4,
   marginHorizontal: 10,
   height:600
 },
 TextStyle :{
   alignItems:'center'
 },
ImputTextContainer: {
  flexDirection:'row'
}
});
export default withNavigation(FormSearch);
