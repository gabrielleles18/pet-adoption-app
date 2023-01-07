import {StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    items: {
        borderColor: '#EFEFF0',
        borderWidth: 1,
        padding: 7,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    processo: {
        paddingBottom: 10,
    },
    pet:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontWeight: '500',
        fontSize: 18,
        marginTop: 8
    },
    breed: {
        fontSize: 14,
        fontWeight: '400'
    },
});

export default styles;