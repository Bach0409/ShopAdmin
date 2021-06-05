import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import HomeScreen from './app/Screen/HomeScreen';
import LoginScreen from './app/Screen/LoginScreen';
import AddProduct from './app/Screen/AddProduct';
import EditProduct from './app/Screen/EditProduct';



const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home"  >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false, headerLeft: null }}
            />
            <Stack.Screen
              name="Add"
              component={AddProduct}
              options={{ headerShown: false, headerLeft: null }}
            /><Stack.Screen
              name="Edit"
              component={EditProduct}
              options={{ headerShown: false, headerLeft: null }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  )
}

export default App
