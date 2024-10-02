// src/components/UserMenu.js

import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import cakeImages from '../assets/cakeImages';

const UserMenu = ({ navigation }) => {
    const [selectedCakeId, setSelectedCakeId] = useState('');

    const handleOrder = (cakeId) => {
        setSelectedCakeId(cakeId);
        Alert.alert(
            'Order Confirmation',
            `You have selected ${cakeImages.find(cake => cake.id === cakeId).name}. Would you like to place the order?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: () => {
                        
                        navigation.navigate('OrderPlacement', { cakeId });
                    }
                },
            ],
            { cancelable: false }
        );
    };

    const renderCakeItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleOrder(item.id)}>
            <View style={styles.cakeContainer}>
                <Image source={item.image} style={styles.cakeImage} />
                <Text style={styles.cakeName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cakeImages}
                renderItem={renderCakeItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,

    },
    cakeContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        backgroundColor:"#605088",

    },
    cakeImage: {
        width: 175,
        height: 140,
        borderRadius: 10,
    },
    cakeName: {
        fontStyle:"bold",
        marginTop: 5,
        textAlign: 'center',
        color:"yellow",
    },
});

export default UserMenu;
