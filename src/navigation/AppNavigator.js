// src/navigation/AppNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserMenu from '../components/UserMenu';
import AdminPanel from '../components/AdminPanel';
import UserSignIn from '../components/UserSignIn';
import UserSignUp from '../components/UserSignUp';
import OrderStatus from '../components/OrderStatus';
import OrderPlacement from '../components/OrderPlacement';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="UserSignIn">
            <Drawer.Screen name="UserSignIn" component={UserSignIn} />
            <Drawer.Screen name="UserSignUp" component={UserSignUp} />
            <Drawer.Screen name="UserMenu" component={UserMenu} />
            <Drawer.Screen name="AdminPanel" component={AdminPanel} />
            <Drawer.Screen name="OrderStatus" component={OrderStatus} />
            <Drawer.Screen name="OrderPlacement" component={OrderPlacement} />
        </Drawer.Navigator>
    );
    };

export default AppNavigator;

