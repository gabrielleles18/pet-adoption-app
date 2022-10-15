// @ts-ignore
import styled from 'styled-components/native';
import Colors from "../../constants/Colors";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    info: {
        flex: 1,
    },
    owner: {
        fontSize: 10,
        fontWeight: '400',
        color: '#B4AEAE',
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        color: '#5F5B5B',
    },
    social: {
        width: 35,
        height: 35,
        borderRadius: 35,
        backgroundColor: Colors.light.primaryLightLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
