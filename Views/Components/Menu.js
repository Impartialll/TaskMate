import React from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/base';
import { Menu, Divider, PaperProvider } from 'react-native-paper';

import { Entypo } from '@expo/vector-icons';

export default function MyMenu() {
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
          <Menu.Item leadingIcon="run" onPress={() => {}} title="Всі категорії" />
          <Divider />
          <Menu.Item leadingIcon="plus" onPress={() => {}} title="Створити категорію" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
  );
};