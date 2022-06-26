import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../views/Home';
import Profile from '../views/Profile';
import PersonalProfile from '../views/PersonalProfile';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Perfil" component={Profile} />
      <Drawer.Screen name="PersonalProfile" component={PersonalProfile} />
    </Drawer.Navigator>
  );
};
