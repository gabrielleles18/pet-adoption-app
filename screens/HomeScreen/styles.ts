import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

const styles = StyleSheet.create({
    father: {
        width: '100%',
        flex: 1,
    },
    menu: {
        flexGrow: 1,
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 30,
        paddingVertical: 30,
        justifyContent: 'space-between'
    },
    itens: {
        width: 180,
        marginTop: '50%'
    },
    row: {
        flexDirection: 'row',
        marginVertical: 10
    },
    menuIcons: {
        color: 'white'
    },
    menuTitle: {
        color: 'white',
        fontSize: 17,
        marginLeft: 10
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'red',
        marginLeft: 34,
        marginVertical: 16
    },
    logoff: {
        flexDirection: 'row'
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 15,
        backgroundColor: Colors.light.textWhite,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: getStatusBarHeight() + 20,
    },
    feed: {
        marginTop: 30,
        paddingBottom: 140
    },
});

export default styles