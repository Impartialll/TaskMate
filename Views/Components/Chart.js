import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { Button, Text } from '@rneui/base';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const TaskStatistics = () => {
  const [interval, setInterval] = useState('week');

  const data = {
    week: {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
      datasets: [{ data: [5, 3, 4, 2, 7, 8, 6] }]
    },
    month: {
      labels: ['Тиж 1', 'Тиж 2', 'Тиж 3', 'Тиж 4'],
      datasets: [{ data: [20, 22, 18, 24] }]
    },
    year: {
      labels: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
      datasets: [{ data: [120, 115, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220] }]
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
      <Text h4 style={{ fontSize: 18, textAlign: 'center', marginBottom: 16 }}>Статистика виконаних завдань</Text>
      <LineChart
        data={data[interval]}
        width={screenWidth - 16}
        height={230}
        yAxisLabel="Вик."
        yAxisInterval={1}
        chartConfig={{
            style: {
                borderRadius: 16,
            },
            paddingTop: 100,
            backgroundColor: '#fff',
            backgroundGradientFrom: '#AD1457',
            backgroundGradientTo: '#750b39',
            decimalPlaces: 0,
            color: (opacity = 255) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 255) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#660d35'
            }
        }}
        style={{borderRadius: 16}}
        // bezier
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        <Button title="Цей тиждень" onPress={() => setInterval('week')} />
        <Button title="Цей місяць" onPress={() => setInterval('month')} />
        <Button title="Цей рік" onPress={() => setInterval('year')} />
      </View>
    </View>
  );
};

export default TaskStatistics;
