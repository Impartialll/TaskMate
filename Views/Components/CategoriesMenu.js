import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Menu, Divider } from 'react-native-paper'
import { Button } from '@rneui/base';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function CategoriesMenu({ categories, deleteCategory }) {
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
            contentStyle={{marginRight: 145, marginTop: 30}}
            visible={visible}
            onDismiss={closeMenu}
            children={
                <FlatList
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={(item) =>
                    <Menu.Item
                    leadingIcon={() => <MaterialIcons name="category" size={24} color="black" />}
                    trailingIcon={() => 
                        <Button
                        // type='clear'
                        color="#AD1457"
                        size='sm'
                        icon={<FontAwesome name="trash-o" size={24} color="#fff" />}
                        onPress={() => deleteCategory(item.item.id)}
                        containerStyle={{width: "130%", height: "90%",}}
                        buttonStyle={{justifyContent: "center", alignItems: "center"}}
                        />
                    }
                    contentStyle={{justifyContent: "center", alignItems: "flex-start"}}
                    title={item.item.name}
                    />}
                ItemSeparatorComponent={() => <Divider />}
                style={{ maxHeight: 200 }}
                />
            }
            anchor={
                <Menu.Item
                    leadingIcon={() => <MaterialIcons name="category" size={24} color="black" />}
                    onPress={openMenu}
                    contentStyle={{justifyContent: "center", alignItems: "flex-start", marginRight: 12}}
                    title="Категорії"
                />
            }>
        </Menu>
    </View>
  )
}

const styles = StyleSheet.create({})