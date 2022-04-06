import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MakeElevator from '../screens/MakeElevator';
import Elevators from '../screens/Elevators';

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <Nav.Navigator
      initialRouteName="MakeElevator"
      screenOptions={{headerShown: false}}>
      <Nav.Screen name="MakeElevator" component={MakeElevator} />
      <Nav.Screen name="Elevators" component={Elevators} />
    </Nav.Navigator>
  );
};

export default Root;
