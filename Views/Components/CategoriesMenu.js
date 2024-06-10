import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Menu, Divider } from 'react-native-paper'
import { Button } from '@rneui/base';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function CategoriesMenu() {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

  return (
    <View
        style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
        }}>
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
                <Menu.Item
                    leadingIcon={() => <MaterialIcons name="category" size={24} color="black" />}
                    onPress={openMenu}
                    title="Категорії"
                />
            }>
            <Menu.Item leadingIcon={() =>
                <MaterialIcons name="category" size={24} color="black" />}
                onPress={() => {}}
                title="Категорії"
            />
            <Divider />
            <Menu.Item
                leadingIcon={() => <Entypo name="plus" size={24} color="black" />}
                onPress={() => {}}
                title="Нова категорія"
            />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
    </View>
  )
}

const styles = StyleSheet.create({})