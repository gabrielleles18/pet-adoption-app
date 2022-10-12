import {StyleSheet} from "react-native";
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 30,
    },
    image: {
        width: '80%',
        height: 310,
        alignSelf: 'center',
        marginVertical: 50
    },
    content: {
        flex: 1
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        color: Colors.light.textWhite,
        marginBottom: 10,
        textAlign: 'center'
    },
    text: {
        color: Colors.light.textWhite,
        fontWeight: '300',
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center'
    }
});

export default styles;