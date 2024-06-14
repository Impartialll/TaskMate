import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Alert } from 'react-native'
import { Menu, Divider } from 'react-native-paper'
import { Button, Text } from '@rneui/base';
import { showMessage, hideMessage } from "react-native-flash-message";

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function CategoriesMenu({ categories, deleteCategory }) {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleCategoriesPress = () => {
        if (categories.length > 0) {
            openMenu();
        } else {
            showMessage({
                message: "Категорій поки немає.",
                description: "Ви можете створити нові категорії за допомогою іншої кнопки.",
                type: "info",
            });
        }
    };

    const leftIcon = () => {
        return(
            <FontAwesome name="camera" size={20} color="black" style={{paddingTop: 12}} />
        );
    };

    const rightIcon = () => {
        return (
            <Button
                type='clear'
                size='sm'
                icon={<FontAwesome name="trash-o" size={24} color="#AD1457" />}
                onPress={() => deleteCategory(item.item.id)}
                containerStyle={{width: "130%", height: "90%", justifyContent: "center", alignItems: "center" }}
                buttonStyle={{justifyContent: "center", alignItems: "center"}}
                />
        );
    };

    const ItemsList = () => {
        return (
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={(item) =>
                        <Menu.Item
                        leadingIcon={leftIcon}
                        trailingIcon={rightIcon}
                        // titleStyle={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}
                        contentStyle={{justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}
                        title={item.item.name}
                        />
                        }
                ItemSeparatorComponent={() => <Divider />}
                style={{ maxHeight: 200 }}
                />
        );
    };

    const CategoriesButton = () => {
        return (
            <Menu.Item
                leadingIcon={() => <MaterialIcons name="category" size={24} color="black" />}
                onPress={handleCategoriesPress}
                contentStyle={{justifyContent: "center", alignItems: "flex-start", marginRight: 12}}
                title="Категорії"
                />
        );
    };

  return (
    <View
        style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: "center"
        }}>
        <Menu
            contentStyle={{marginRight: 145, marginTop: 30}}
            visible={visible}
            onDismiss={closeMenu}
            anchor={<CategoriesButton/>}
            children={<ItemsList/>}
            >
        </Menu>
    </View>
  )
}

const styles = StyleSheet.create({});