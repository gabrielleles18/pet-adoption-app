import {TextInput, View} from "react-native";
import styles from "./styles";
import Feed from "../../components/Feed";
import Category from "../../components/Category";
import {Ionicons} from '@expo/vector-icons';
import Profile from "../../components/Profile";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="md-menu" size={35} color="#5F5B5B"/>
                <View style={styles.search}>
                    <Ionicons name="location-sharp" size={18} color="#9B8ACA"/>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        placeholder="Location"
                    />
                    <Ionicons name="md-close-outline" size={22} color="#3C3C43"/>
                </View>
                <Profile hiddenName={true} hiddenSocial={true}/>
            </View>
        </View>
    );
}

