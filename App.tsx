import React from 'react'
import { SafeAreaView, View, StatusBar, StyleSheet, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './src/Navigator/DrawerNavigationComponent'
const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
          <DrawerNavigator />
      </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
})

export default App
