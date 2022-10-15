import {Text, View} from "react-native";
import styles from "./styles";
import Feed from "../../components/Feed";
import Category from "../../components/Category";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            {/*<Feed name='Noble' sex='male' breed='Jack Russell terrier'/>*/}
            <Category data={
                {
                    name: 'Dogs',
                    isActive: false,
                    image: 'dogs'
                }
            }/>
        </View>
    );
}

