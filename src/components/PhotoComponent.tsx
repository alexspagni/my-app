import React from 'react';
import {StyleSheet,Image} from 'react-native';

const PhotoComponent = ({object }:any)=>{

    return(
        <Image source={{uri:object.img_src}} style={styles.image}/>
        );
    
}
const styles=StyleSheet.create({
    image: {
        width: 250,
        height : 120,
        borderRadius:4
        
      }
});
export default PhotoComponent;