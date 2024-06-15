import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "@rneui/base";
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import NewCategory from "./NewCategory";

export default function HeaderComponent({ categories, setCat, setCats, selectedCategory, onCreate, onClose, visible, openModal }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteCategory = async (categoryId) => {
    try {
      const existingCategories = await AsyncStorage.getItem('categories');
      let categoriesArray = existingCategories ? JSON.parse(existingCategories) : [];
      categoriesArray = categoriesArray.filter(category => category.id !== categoryId);
      await AsyncStorage.setItem('categories', JSON.stringify(categoriesArray));
      setCats(categoriesArray);
    } catch (error) {
      console.error("Error deleting the category:", error);
    }
  };

  const createCategory = () => {
    openModal();
  };

  return (
    <View style={styles.container}>
      {categories.length === 0 ? (
        <Button
          // title="Нова категорія"
          buttonStyle={styles.buttonStyle}
          containerStyle={[styles.buttonContainer, {borderColor: "#fff"}]}
          titleStyle={styles.titleStyle}
          onPress={createCategory}
          >
            <Text style={{paddingRight: 8}}>Нова категорія</Text>
            <EvilIcons name="plus" size={24} color="black" />
        </Button>
      ) : (
        categories.slice(0, 3).map((item) => (
          <Button
            key={item.id}
            title={item.name}
            buttonStyle={styles.buttonStyle}
            containerStyle={[styles.buttonContainer, {borderColor: selectedCategory === item.name ? "#AD1457" : "#fff"}]}
            titleStyle={styles.titleStyle}
            onPress={() => setCat(item.name)}
            onLongPress={() => deleteCategory(item.id)}
          />
        ))
      )}
      <NewCategory
        visible={visible}
        onCreate={onCreate}
        onClose={onClose}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  buttonContainer: {
    marginHorizontal: 10,
    borderRadius: 17,
    borderWidth: 5,
  },
  buttonStyle: {
    backgroundColor: "#fff",
  },
  titleStyle: {
    color: "#AD1457",
    fontWeight: "800",
    fontSize: 14,
  },
});
