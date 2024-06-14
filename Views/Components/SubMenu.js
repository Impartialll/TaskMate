import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Alert } from 'react-native'
import { Menu, Divider } from 'react-native-paper'
import { Button, Text } from '@rneui/base';
import { showMessage, hideMessage } from "react-native-flash-message";

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function SubMenu({ categories }) {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const cats = [...categories];

    const handleCategoriesPress = () => {
        if (cats.length > 0) {
            openMenu();
        } else {
            showMessage({
                message: "Категорій поки немає.",
                description: "Ви можете створити нові категорії за допомогою іншої кнопки.",
                type: "info",
            });
        }
    };

    const leftIcon = () => (
        <FontAwesome name="camera" size={20} color="black" style={{paddingTop: 12}} />
    );

    const rightIcon = () => (
        <Button
            type='clear'
            size='sm'
            icon={<FontAwesome name="trash-o" size={24} color="#AD1457" />}
            onPress={() => deleteCategory(item.item.id)}
            containerStyle={{width: "130%", height: "90%", justifyContent: "center", alignItems: "center" }}
            buttonStyle={{justifyContent: "center", alignItems: "center"}}
            />
    );

    const ItemsList = () => (
        <View>
            <Text style={{fontSize: 16, fontWeight: "700", paddingVertical: 5, textAlign: "center"}}>
                Оберіть категорію
            </Text>
            <Divider/>
            <FlatList
                data={cats}
                keyExtractor={(item) => item.id}
                renderItem={(item) =>
                    <Menu.Item
                    leadingIcon={leftIcon}
                        // titleStyle={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}
                        contentStyle={{justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}
                        title={item.item.name}
                        />
                        }
                        ItemSeparatorComponent={() => <Divider />}
                        style={{ maxHeight: 200 }}
                />
        </View>
    );

    const CategoriesButton = () => (
        <Button
            icon={<MaterialIcons name="category" size={24} color="black" />}
            onPress={handleCategoriesPress}
            contentStyle={{justifyContent: "center", alignItems: "flex-start", marginRight: 12}}
            containerStyle={{ borderRadius: 30 }}
            />
    );

  return (
    <View
        style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: "center"
        }}>
        <Menu
            contentStyle={{marginRight: 30, marginTop: 30}}
            visible={visible}
            onDismiss={closeMenu}
            anchor={<CategoriesButton/>}
            children={<ItemsList/>}
            >
        </Menu>
    </View>
  )
}