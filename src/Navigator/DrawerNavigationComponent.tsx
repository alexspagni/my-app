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

      <Drawer.Screen name="ShowScreen" component={ShowScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

