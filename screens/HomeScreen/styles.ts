import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    search: {
        width: 230,
        height: 45,
        backgroundColor: '#F6F4F9',
        borderRadius: 35,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginLeft: 5,
        fontSize: 14,
        color: Colors.light.text,
        fontWeight: '600',
    }

});

export default styles