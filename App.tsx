import React from 'react';
import { ImageComponent, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Navigator} from './src/navigator/Navigator';



const App = () => {
  return (
    <NavigationContainer>
        <Navigator/>
    </NavigationContainer>
     

  )
}

export default App;