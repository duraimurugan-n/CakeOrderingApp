// src/components/UserSignIn.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const UserSignIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        try {
            await auth().signInWithEmailAndPassword(email, password);
            Alert.alert("Success", "Welcome back!");
            navigation.navigate('UserMenu');
        } catch (error) {
            Alert.alert("Error", "Invalid email or password.");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/1.png')} style={styles.cakeImage} />
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Password"
                secureTextEntry
            />
            <Button title="Sign In" onPress={handleSignIn} />
            <Text style={styles.footerText}>
                Don't have an account?
                <Text style={styles.link} onPress={() => navigation.navigate('UserSignUp')}> Sign Up</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    cakeImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color:"purple",
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
        color:"blue",
    },
    footerText: {
        marginTop: 20,
        fontSize: 16,
        color:"gray",
    },
    link: {
        color: 'blue',
        fontWeight: 'bold',
    },
});

export default UserSignIn;


