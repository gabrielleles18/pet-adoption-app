import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: getStatusBarHeight() + 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.light.textWhite,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    searchAnother: {
        height: 40,
        alignItems: 'center',
        borderColor: '#EFEFF0',
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 10,
        marginVertical: 25,
        zIndex: 9,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.light.primary,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9,
    },
    input: {
        flex: 1,
        marginLeft: 5,
        fontSize: 14,
        color: Colors.light.text,
        fontWeight: '600',
    },
    feed: {
        marginTop: 30,
        paddingBottom: 140
    },
});

export default styles