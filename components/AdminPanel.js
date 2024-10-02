// src/components/AdminPanel.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, Alert } from 'react-native';
import cakeImages from '../assets/cakeImages';
import firestore from '@react-native-firebase/firestore';

const AdminPanel = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersSnapshot = await firestore().collection('orders').get();
                const fetchedOrders = ordersSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching orders: ', error);
            }
        };

        fetchOrders();
    }, []);

    const approveOrder = async (orderId) => {
        try {
            await firestore().collection('orders').doc(orderId).update({ status: 'Approved' });
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: 'Approved' } : order
                )
            );
            Alert.alert('Success', `Order ${orderId} has been approved!`);
        } catch (error) {
            console.error('Error approving order: ', error);
            Alert.alert('Error', 'Failed to approve the order.');
        }
    };

    const renderOrderItem = ({ item }) => {
        const cake = cakeImages.find(cake => cake.id === item.cakeId);
        return (
            <View style={styles.orderContainer}>
                <Text style={styles.orderId}>Order ID: {item.id}</Text>
                <Text style={styles.status}>Status: {item.status}</Text>
                {cake && <Image source={cake.image} style={styles.cakeImage} />}
                {item.status === 'Pending' && (
                    <Button
                        title="Approve Order"
                        onPress={() => approveOrder(item.id)}
                    />
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Admin Panel</Text>
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
        color:"purple",
    },
    orderContainer: {
        marginBottom: 20,
        padding: 10,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        color:"lightgreen",
    },
    orderId: {
        fontSize: 18,
        color:"green",
    },
    status: {
        fontSize: 16,
        color:"blue",
    },
    cakeImage: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    missingImageText: {
        fontSize: 14,
        color: 'red',
    },
});

export default AdminPanel;
