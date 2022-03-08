import React from 'react'
import {  StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './src/Navigator/DrawerNavigationComponent'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './src/reducers'
import { createStackNavigator } from '@react-navigation/stack'
import SerchScreen from './src/screens/SearchScreen'
import { navigationContainerRef } from './src/Navigator/ContainerRef'

const Stack=createStackNavigator();

const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <NavigationContainer ref={navigationContainerRef}>
        <Stack.Navigator initialRouteName='drawer'>
          <Stack.Screen name="drawer" component={DrawerNavigator} options={{ headerShown: false}} />
          <Stack.Screen name="Search" component={SerchScreen} options={{ presentation: 'modal' }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
})

export default App
