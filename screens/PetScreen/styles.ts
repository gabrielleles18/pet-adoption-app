import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        position: "relative",
    },
    favorite: {
        width: 35,
        height: 35,
        borderRadius: 35,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        position: "absolute",
        zIndex: 999,
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: getStatusBarHeight() + 10,
    },
    image: {
        width: '100%',
        height: 300,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    content: {
        padding: 20,
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.light.text
    },
    addressContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 15
    },
    address: {
        fontSize: 14,
        marginLeft: 5,
        fontWeight: '400'
    },
    details: {
        flexDirection: 'row',
        marginBottom: 25,
        justifyContent: 'space-between'
    },
    detail: {
        width: '23%',
        borderWidth: 1,
        borderColor: '#EFEFF0',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    detailTitle: {
        fontSize: 14,
        color: Colors.light.text,
        textAlign: 'center',
        marginBottom: 5
    },
    detailValue: {
        fontSize: 15,
        color: Colors.light.text,
        textAlign: 'center',
        fontWeight: '500'
    },
    aboutContainer: {
        flex: 1
    },
    about: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 20,
        marginBottom: 5,
        color: Colors.light.text
    },
    abstract: {
        fontSize: 15,
        color: Colors.light.text,
        fontWeight: '300',
        marginBottom: 30,
    }
});

export default styles;