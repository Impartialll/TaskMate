import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card, Button, Icon } from "@rneui/base";

import { ProgressBar, MD3Colors } from 'react-native-paper';

const MyProgress = () => (
    <ProgressBar
    progress={Math.random()}
    color={"yellow"}
    style={styles.progressBar} 
    />
  );

export default function MyCard({ data }) {
  return (
    <View style={styles.container}>
    {data.map((goal) => {
            return (
          <Card key={goal.id} containerStyle={styles.card}>
            <View style={styles.containerTitle}>
              <View style={styles.titleLeft}>
                <Text h4>{goal.name}</Text>
              </View>
              <View style={styles.titleRight}>
                <MyProgress/>
              </View>
            </View>
            <Card.Divider />
            <View style={styles.description}>
              <Text style={styles.name}>{goal.description}</Text>
            </View>
          </Card>
        );
    })}
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        paddingBottom: "35%",
      },
    card: {
        borderRadius: 20,
      },
    name: {
      fontSize: 16,
      marginVertical: 5,
    },
    description: {
        marginVertical: 5,
        marginHorizontal: 10,
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginVertical: 20,
      },
    titleLeft: {
        flex: 1,
        marginHorizontal: 10,
        alignItems: "flex-start",
    },
    titleRight: {
        flex: 1,
        // alignItems: "center",
    },
    progressBar: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "black",
      height: 20,
      width: '100%',
    },
});