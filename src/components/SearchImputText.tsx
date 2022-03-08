import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


type FormProps={
    term: string,
    value:string,
    onChangeText(s:string):void,

  }
const SearchImputText: React.FC<FormProps>= ({term,value,onChangeText}) => {
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
export default SearchImputText;

