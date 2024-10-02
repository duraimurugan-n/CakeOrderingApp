// src/components/AdminDialog.js
import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const AdminDialog = ({ visible, onClose, onSubmit }) => {
    const handleSubmit = () => {
        // Add logic to handle submission
        onSubmit();
        onClose(); // Close dialog after submission
    };

    return (
        <Modal visible={visible} animationType="slide">
        <View style={styles.container}>
            <Text style={styles.header}>Admin Actions</Text>
            {/* Add input fields or any other components for admin actions here */}
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Cancel" onPress={onClose} />
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default AdminDialog;

