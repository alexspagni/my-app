import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import App from './StackNavigator'


const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeStack" component={App} />
 
    </Drawer.Navigator>
  )
}

export default DrawerNavigator


/*import React from "react";
import { View,Button } from "react-native";
type DrawerNavigationComponent ={
    navigation:any
}
export const Bella:React.FC<DrawerNavigationComponent>=({ navigation }) =>{
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    );
  }
  
  export const NotificationsScreen :React.FC<DrawerNavigationComponent>=({ navigation }) =>{
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }
  */