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
    feed: {
        marginTop: 30,
        paddingBottom: 140
    },
});

export default styles