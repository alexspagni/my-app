import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {getImageMars} from '../api/getImage';
import Checkbox from 'expo-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProvider, withNavigation } from 'react-navigation';
import { addElementsToLibrariesMars } from '../reducers/getImagesReducers';

type FormProps={
    term: string,
    value:string,
    onChangeText(s:string):void,
    navigation:any
  }
const SearchImputText: React.FC<FormProps>= ({term,value,onChangeText,navigation}) => {
    
    const images=useSelector((store: any)=>store?.images);
    const dispatch = useDispatch();
    const [isChecked, setChecked] = useState(false);
  return (
  
    <View >
     
     <TextInput
       autoCorrect={false}
       style={styles.inputStyle}
       placeholder={value}
       value={term}
       onChangeText={onChangeText}
     />
   </View>
 );
};

const styles = StyleSheet.create({
 
 inputStyle: {
   
   margin: 10,
   fontSize: 18,
   backgroundColor: '#F0EEEE',
 },
 

});
export default withNavigation(SearchImputText);

