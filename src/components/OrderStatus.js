// src/components/OrderStatus.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import cakeImages from '../assets/cakeImages';

const OrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderSnapshot = await firestore().collection('orders').get();
                const fetchedOrders = orderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching orders: ', error);
                Alert.alert('Error', 'Failed to fetch order status.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const renderOrderItem = ({ item }) => {
        const cake = cakeImages.find(cake => cake.id === item.cakeId);
        return (
            <View style={styles.orderContainer}>
                <Text style={styles.orderId}>Order ID: {item.id}</Text>
                <Text style={styles.username}>Username: {item.username}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>
                {cake && <Image source={cake.image} style={styles.cakeImage} />}
            </View>
        );
    };

    if (loading) {
        return <Text>Loading order status...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Status</Text>
            <FlatList
                data={orders}
                renderItem={renderOrderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color:"green",
    },
    orderContainer: {
        marginBottom: 20,
        padding: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        color:"light blue",
    },
    orderId: {
        fontSize: 18,
        color:"red",
    },
    cakeId: {
        fontSize: 16,
        color:"blue",
    },
    username: {
        fontSize: 16,
        color:"red",
    },
    status: {
        fontSize: 16,
        color:"green",
    },
    cakeImage: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
});

export default OrderStatus;

