import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

const iconSet = [
    (props) => <Entypo name="camera" {...props} />,
    (props) => <FontAwesome name="home" {...props} />,
    (props) => <FontAwesome5 name="dog" {...props} />,
    (props) => <FontAwesome6 name="hotdog" {...props} />,
    (props) => <FontAwesome6 name="map-location" {...props} />,
    (props) => <FontAwesome5 name="cat" {...props} />,
    (props) => <MaterialCommunityIcons name="human-dolly" {...props} />,
    (props) => <FontAwesome5 name="running" {...props} />,
    (props) => <MaterialIcons name="attach-money" {...props} />,
    (props) => <FontAwesome6 name="computer" {...props} />,
    (props) => <Ionicons name="game-controller" {...props} />,
    (props) => <MaterialCommunityIcons name="bird" {...props} />,
    (props) => <MaterialIcons name="directions-boat-filled" {...props} />,
];

const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconSet.length);
    return iconSet[randomIndex];
};

const IconSet = ({ style, size, color }) => {
    const RandomIcon = getRandomIcon();
    return (
        <View>
            <RandomIcon style={style} size={size} color={color} />
        </View>
    );
};

export default IconSet;
