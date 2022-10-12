import {Image, SafeAreaView, Text, View} from "react-native";
import styles from "./styles";

import weclomeImage from "../../assets/images/welcome.png";
import ButtonIcon from "../../components/ButtonIcon";

export default function WelcomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={weclomeImage} style={styles.image} resizeMode='contain'/>
            <View style={styles.content}>
                <Text style={styles.title}>Make new Friends</Text>
                <Text style={styles.text}>
                    Here you can meet your dream friend and joy with them,
                    your dream friend and joy with.
                </Text>
            </View>
            <ButtonIcon text='Get Started' materialIcon='pets'/>
        </SafeAreaView>
    )
}