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
const FormSearch: React.FC<FormProps>= ({term,value,onChangeText,navigation}) => {
    const images=useSelector((store: any)=>store?.images);
    const dispatch = useDispatch();
    const [isChecked, setChecked] = useState(false);
    //una volta premuto enter nella sulla tastiera dello schermo vado a recuperare delle immagini delle rover
        const getImageFromMars = async () => {
            const results= await getImageMars(term);
            dispatch(dispatch(addElementsToLibrariesMars(results)))
            navigation.navigate('Index');
    }
  return (
    <View style={styles.backgroundStyle}>
     
      <TextInput
        
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder={value}
        value={term}
        onChangeText={onChangeText}
        onEndEditing={()=>getImageFromMars()}
        
      />
      <TextInput
        
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder={value}
        value={term}
        onChangeText={onChangeText}
        onEndEditing={()=>getImageFromMars()}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: '#F0EEEE',
    height: 600,
    borderRadius: 5,
    borderColor:'black',
    borderWidth:4,
    marginHorizontal: 15,
    marginBottom: 10
  },
  inputStyle: {
    margin: 1,
    fontSize: 18
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15
  },

});
export default withNavigation(FormSearch);

