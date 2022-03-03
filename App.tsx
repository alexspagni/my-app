import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/reducers';
const navigator = createStackNavigator(
  {
    Index: IndexScreen,
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Business Search',
    },
  }
);
const App=createAppContainer(navigator);

export default ()=>{
  return (
    <Provider store={createStore(reducers)}>
     <App/>
  </Provider>
  );
} ;
