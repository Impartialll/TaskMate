import React, {useState} from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, Input } from '@rneui/base';

import { FontAwesome5 } from '@expo/vector-icons';

export default function NewCategory({ visible, onClose, onCreate, closeMenu }) {
    const [categoryName, setCategoryName] = useState('');

    const handleCreate = () => {
        if (categoryName.trim()) {
            onCreate(categoryName);
            setCategoryName('');
        }
        onClose();
        closeMenu();
    };

    const handleClose = () => {
        setCategoryName('');
        onClose();
        closeMenu();
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={handleClose}
        >
            <TouchableWithoutFeedback onPress={handleClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Нова категорія</Text>
                            <Input
                                inputStyle={{fontSize: 16}}
                                placeholder="Назва категорії"
                                leftIcon={<FontAwesome5 name="running" size={24} color="black" style={{padding: 5}} />}
                                onChangeText={(text) => setCategoryName(text)}
                            />
                            <View style={styles.closeSaveContainer}>
                                <Button
                                title="Скасувати"
                                titleStyle={{fontSize: 16}}
                                size="sm"
                                containerStyle={styles.button}
                                buttonStyle={{borderWidth: 1, borderRadius: 4}}
                                onPress={handleClose}
                                type="outline"
                                />
                                <Button
                                title="Зберегти"
                                titleStyle={{fontSize: 16}}
                                size="sm"
                                color="secondary"
                                containerStyle={styles.button}
                                onPress={handleCreate}
                                type="solid"
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: "800"
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#2089dc',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#ff5c5c',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    closeSaveContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
      },
    button: {
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 4,
    },
});