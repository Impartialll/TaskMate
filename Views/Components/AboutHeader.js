import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Avatar } from '@rneui/base'

import { Ionicons } from '@expo/vector-icons';

export default function AboutHeader({ navigation }) {
  return (
    <View style={{flex: 1, alignItems: "center"}}>
        <View style={{alignItems: "center", borderWidth: 1, marginTop: 50}}>
            <Avatar
            size={128}
            rounded
            icon={{ name: 'pencil', type: 'font-awesome' }}
            containerStyle={{ backgroundColor: '#6733b9' }}
            />
        </View>
        <View style={{borderWidth: 1, position: "absolute", alignSelf: "flex-end"}}>
            <Button
            type='clear'
            icon={<Ionicons name="settings-outline" size={28} color="black" />}
            // containerStyle={{alignSelf: "flex-end", margin: 5}}
            onPress={() => {
                navigation.navigate("Settings");
                }}
                />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({});