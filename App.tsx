import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import ShowScreen from './src/screens/ShowScreen';
import ImagesHide from './src/screens/ImagesHide';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/reducers';
import SearchScreen from './src/screens/SearchScreen';
const Drawer = createDrawerNavigator();
const Navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show:ShowScreen,
    Search:SearchScreen,
  },
  {
    
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Space application',
    },
  }
);
const App=createAppContainer(Navigator);

export default ()=>{
  return (
    <Provider store={createStore(reducers)}>
  
        <App/>
    
     
  </Provider>
  );
} ;
