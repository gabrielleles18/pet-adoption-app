import {StyleSheet, Dimensions} from "react-native";
import Colors from "../../constants/Colors";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        paddingVertical: 20
    },
    containerForm: {
        flex: 1,
        marginTop: 20,
    },
    row: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
        marginBottom: 5
    },
    input: {
        backgroundColor: '#F6F4F9',
        height: 42,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
});

export default styles;