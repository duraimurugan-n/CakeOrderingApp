// src/components/UserDrawer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { auth } from '../firebaseConfig';

const UserDrawer = (props) => {
    const handleSignOut = () => {
        auth.signOut().then(() => {
        // Handle sign-out
        });
    };

    return (
        <DrawerContentScrollView {...props}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Welcome</Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label="Sign Out" onPress={handleSignOut} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    header: { padding: 20, backgroundColor: 'blue' },
    headerText: { color: 'white', fontSize: 24, fontWeight: 'bold' },
});

export default UserDrawer;
