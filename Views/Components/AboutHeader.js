import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Avatar, Text } from '@rneui/base'
import { Ionicons } from '@expo/vector-icons';

export default function AboutHeader({ navigation }) {
  return (
    <View style={{ alignItems: "center", paddingBottom: 15}}>
        <View style={{ alignItems: "center", marginTop: 30 }}>
            <Avatar
              size={128}
              rounded
              icon={{ name: 'camera', type: 'font-awesome' }}
              containerStyle={{ backgroundColor: '#AD1457' }}
              />
              <Text h4 style={{paddingTop: 10}} >User name</Text>
        </View>
        <View style={{ position: "absolute", alignSelf: "flex-end" }}>
            <Button
              containerStyle={{ borderRadius: 30 }}
              type='clear'
              icon={<Ionicons name="settings-outline" size={28} color="black" />}
              onPress={() => {
                  navigation.navigate("Settings");
                  }}
              />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({});