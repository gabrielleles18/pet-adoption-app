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
        alignItems: 'center',
    },
    search: {
        height: 45,
        backgroundColor: '#F6F4F9',
        borderRadius: 35,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 12,
        alignItems: 'center',
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
    searchAnother: {
        height: 40,
        alignItems: 'center',
        borderColor: '#EFEFF0',
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 10,
        paddingLeft: 10,
        marginVertical: 25,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: Colors.light.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    feed:{
        marginTop: 30,
    },
    flatList:{
        flexGrow: 0,
    }
});

export default styles