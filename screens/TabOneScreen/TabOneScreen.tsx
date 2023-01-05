import styles from "./styles";
import {View} from '../../components/Themed';
import {RootTabScreenProps} from '../../types';
import React from "react";
import {Text} from "react-native";

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {
    return (
        <View style={styles.container}>
            <Text>rerg</Text>
        </View>
    );
}