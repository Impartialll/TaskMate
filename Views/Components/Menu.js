import React from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/base';
import { Menu, Divider } from 'react-native-paper';

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import CategoriesMenu from './CategoriesMenu';
import NewCategory from './NewCategory';

export default function MyMenu({ createCategoryModal, isModalVisible, onCreate, onClose }) {
    const [visible, setVisible] = React.useState(false);

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
            <Button
            icon={<Entypo name="dots-three-vertical" size={14} color="black" />}
            type="clear"
            buttonStyle={{}}
            containerStyle={{}}
            onPress={openMenu}
          />
          }>
          {/* <Menu.Item leadingIcon={() => <MaterialIcons name="category" size={24} color="black" />} onPress={() => {}} title="Категорії" /> */}
          <CategoriesMenu />
          <Divider />
          <Menu.Item leadingIcon={() => <Entypo name="plus" size={24} color="black" />} onPress={createCategoryModal} title="Нова категорія" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
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