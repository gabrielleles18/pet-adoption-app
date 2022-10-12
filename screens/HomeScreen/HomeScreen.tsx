import {Text, View} from "react-native";
import styles from "./styles";
import Feed from "../../components/Feed";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Feed name='Noble' sex='male' breed='Jack Russell terrier'/>
        </View>
    );
}

