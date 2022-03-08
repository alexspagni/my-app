import React ,{useEffect, useState}from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Alert } from 'react-native';

export const hideImageAlert = () =>
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

    export const imageNotFoundAlert = () =>
    Alert.alert(
      "Warning",
      "Images not found",
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