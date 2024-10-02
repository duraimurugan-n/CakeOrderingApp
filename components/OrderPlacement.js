// src/components/OrderPlacement.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../firebaseConfig';

const OrderPlacement = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [cakeId, setCakeId] = useState('');

    const handlePlaceOrder = async () => {
        const newOrderId = uuidv4();
        if (!username || !cakeId) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }

        try {

            await firestore.collection('orders').add({
                orderId: newOrderId,
                username: username,
                cakeId: cakeId,
                status: 'Pending',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

            Alert.alert('Success', `Order placed successfully with ID: ${newOrderId}`);
            navigation.navigate('OrderStatus');
        } catch (error) {
            console.error('Error placing order:', error);
            Alert.alert('Error', 'Failed to place the order. Try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Place Your Order</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter cake ID"
                value={cakeId}
                onChangeText={setCakeId}
            />
            <Button title="Place Order" onPress={handlePlaceOrder} />
        </View>
    );
};

const styles = StyleSheet.create({
    title:{
        color:"green",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color:"blue",
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 10,
        paddingHorizontal: 10,
        color:"blue",
    },
});

export default OrderPlacement;
