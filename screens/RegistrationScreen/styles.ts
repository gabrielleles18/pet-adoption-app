import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 50
    },
    containerImage: {
        width: 80,
        height: 120,
        elevation: 3,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerIcon: {
        width: 35,
        height: 35,
        backgroundColor: Colors.light.primaryLightLight,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        position: 'absolute'
    },
    containerForm: {
        flex: 1,
        marginTop: 20,
    },
    row: {
        marginBottom: 15
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
    age:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    picker:{
        height: 42,
        width: '35%',
    }
});

export default styles;