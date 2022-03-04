import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import ShowScreen from './src/components/ShowScreen'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/reducers';
const Navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show:ShowScreen
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Business Search',
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
