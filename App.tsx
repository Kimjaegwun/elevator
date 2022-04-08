import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Root from './src/navigation/Root';
import {SafeAreaView} from 'react-native';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
