import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Alert } from 'react-native';

export const hideImage = () =>
    Alert.alert(
      "Hiding",
      "this image is now hided",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") 
      }
      ]
    );