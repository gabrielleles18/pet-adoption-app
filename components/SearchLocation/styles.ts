// @ts-ignore
import styled from 'styled-components/native';
import Colors from "../../constants/Colors";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 25
    },
    input: {
        flex: 1,
        marginLeft: 5,
        fontSize: 14,
        color: Colors.light.text,
        fontWeight: '600',
    },
    search: {
        alignItems: 'center',
        height: 45,
        backgroundColor: '#F6F4F9',
        borderRadius: 35,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    filter: {
        width: '100%',
        backgroundColor: '#eaeaee',
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
        zIndex: 99,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        width: '40%',
        minHeight: 40,
        backgroundColor: Colors.light.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonText:{
        color: Colors.light.textWhite,
        marginRight: 8,
    },
});
