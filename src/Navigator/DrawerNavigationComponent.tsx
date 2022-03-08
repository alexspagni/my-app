import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Feather } from '@expo/vector-icons';
import IndexScreen from '../screens/IndexScreen'
import ShowScreen from '../screens/ShowScreen'
import { TouchableOpacity } from 'react-native'
import { navigationContainerRef } from './ContainerRef';

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName='IndexScreen'>
      <Drawer.Screen name="IndexScreen" component={IndexScreen} options={{headerRight: () => (
            <TouchableOpacity onPress={() => navigationContainerRef.current?.navigate('Search')}>
              <Feather name="search" size={30} />
            </TouchableOpacity>
          ),
      }}
      />

      <Drawer.Screen name="ShowScreen" component={ShowScreen} options={{headerRight: () => (
            <TouchableOpacity onPress={() => navigationContainerRef.current?.navigate('Search')}>
              <Feather name="search" size={30} />
            </TouchableOpacity>
          ),
      }}
      />
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