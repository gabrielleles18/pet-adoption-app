import {StyleSheet, Dimensions} from "react-native";
import Colors from "../../constants/Colors";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        paddingVertical: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 10
    },
    containerImage: {
        width: 120,
        height: 130,
        elevation: 3,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        alignSelf: 'center',
    },
    containerIcon: {
        width: 35,
        height: 35,
        backgroundColor: Colors.light.primaryLightLight,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
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