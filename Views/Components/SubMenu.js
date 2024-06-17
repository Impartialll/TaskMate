import React from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/base';
import { Menu, Divider } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import SubCats from './SubCats';

export default function SubMenu({ createCategoryModal, isModalVisible, onCreate, onClose, categories, setCats, fetchCat, item }) {
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
          style={{paddingRight: 20, paddingTop: 15}}
          anchor={
            <Button
              icon={() => <Entypo name="dots-three-vertical" size={15} color="black" />}
              type="clear"
              containerStyle={{}}
              onPress={openMenu}
              style={{justifyContent: "center", alignItems: "center", flex: 1}}
              />
          }>
          <SubCats categories={categories} item={item} fetchCat={fetchCat} />
        <Menu.Item
            title="Змінити назву"
            leadingIcon={() => <FontAwesome6 name="pen" size={17} color="black" style={{paddingLeft: 4, paddingTop: 3}} />}
            />
        </Menu>
      </View>
  );
};