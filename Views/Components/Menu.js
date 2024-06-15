import React from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/base';
import { Menu, Divider } from 'react-native-paper';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import CategoriesMenu from './CategoriesMenu';
import NewCategory from './NewCategory';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyMenu({ createCategoryModal, isModalVisible, onCreate, onClose, categories, setCats, fetchCats }) {
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const deleteCategory = async (categoryId) => {
      try {
        const existingCategories = await AsyncStorage.getItem('categories');
        let categoriesArray = existingCategories ? JSON.parse(existingCategories) : [];
        categoriesArray = categoriesArray.filter(category => category.id !== categoryId);
        await AsyncStorage.setItem('categories', JSON.stringify(categoriesArray));
        setCats(categoriesArray);
        fetchCats();
      } catch (error) {
        console.error("Error deleting the category:", error);
      }
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
          visible={visible}
          onDismiss={closeMenu}
          style={{paddingRight: 20, paddingTop: 15}}
          anchor={
            <Button
              icon={() => <Entypo name="dots-three-vertical" size={14} color="black" />}
              type="clear"
              containerStyle={{}}
              onPress={openMenu}
              style={{justifyContent: "center", alignItems: "center", flex: 1}}
              />
          }>
          <CategoriesMenu
            categories={categories}
            deleteCategory={deleteCategory}
            />
          <Divider />
          <Menu.Item
            leadingIcon={() => <Entypo name="plus" size={24} color="black" style={{paddingTop: 2,}} />}
            onPress={createCategoryModal}
            title="Нова категорія"
            style={{justifyContent: "center", alignItems: "center", flex: 1}}
            />
        </Menu>
        <NewCategory
          visible={isModalVisible}
          onCreate={onCreate}
          onClose={onClose}
          closeMenu={closeMenu}
          />
      </View>
  );
};