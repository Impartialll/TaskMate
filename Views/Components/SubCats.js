import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Menu, Divider } from 'react-native-paper'
import { Button, Text } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";

import IconSet from './IconSet';

import { MaterialIcons } from '@expo/vector-icons';

export default function SubCats({ categories, setCat, item, fetchCat }) {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const cats = [...categories];

    const updateTaskCategory = async (taskId, newCategory) => {
        try {
            const existingTasks = await AsyncStorage.getItem('tasks');
            const tasksArray = existingTasks ? JSON.parse(existingTasks) : [];
            const taskIndex = tasksArray.findIndex(task => task.id === taskId);
            
            if (taskIndex !== -1) {
                tasksArray[taskIndex].category = newCategory;
                await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));
            }
            fetchCat();
        } catch (error) {
          console.error("Error updating the task category:", error);
        }
    };

    const handleCategoriesPress = () => {
        if (cats.length > 0) {
            openMenu();
        } else {
            showMessage({
                message: "Категорій поки немає.",
                description: "Ви можете створити нову категорію у головному меню.",
                type: "info",
            });
        }
    };

    const onCategoryPress = (categoryName) => {
        updateTaskCategory(item.id, categoryName);
        closeMenu();
      };

    const leftIcon = () => (
        <IconSet size={24} style={{paddingTop: 3}} />
    );

    const ItemsList = () => (
        <View>
            <Text style={{fontSize: 16, fontWeight: "700", paddingLeft: 10, paddingBottom: 5}}>Категорії</Text>
            <Divider bold />
            <FlatList
                data={cats}
                keyExtractor={(item) => item.id}
                renderItem={(item) =>
                    <Menu.Item
                    leadingIcon={leftIcon}
                        titleStyle={{fontSize: 16}}
                        contentStyle={{justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}
                        title={item.item.name}
                        onPress={() => {
                            onCategoryPress(item.item.name);
                        }}
                        />
                        }
                        ItemSeparatorComponent={() => <Divider/>}
                        style={{ maxHeight: 200 }}
                />
        </View>
    );

    const CategoriesButton = () => (
        <>
        <Menu.Item
            title="Обрати категорію"
            leadingIcon={() => <MaterialIcons name="category" size={24} color="black" />}
            onPress={handleCategoriesPress}
            />
        <Divider/>
        </>
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
            contentStyle={{marginRight: 170, marginTop: 30}}
            visible={visible}
            onDismiss={closeMenu}
            anchor={<CategoriesButton/>}
            children={<ItemsList/>}
            >
        </Menu>
    </View>
  )
}