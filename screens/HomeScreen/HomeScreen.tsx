import {SafeAreaView, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {Feather, Ionicons} from '@expo/vector-icons';
import Profile from "../../components/Profile";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import CategoryIdProvider from "../../contexts/categoryPet";
import PetList from "../../components/PetList";

export default function HomeScreen() {
    const [userId, setUserId] = useState<String>('');
    const navigation = useNavigation();

    useEffect(() => {
        //User
        const fetchUser = async () => {
            const userData = await Auth.currentAuthenticatedUser();
            return userData.attributes.sub.toString();
        }

        fetchUser().then(setUserId);
    }, []);

    return (
        <CategoryIdProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="md-menu" size={35} color="#5F5B5B"/>
                    </TouchableOpacity>
                    <View style={styles.search}>
                        <Ionicons name="location-sharp" size={18} color="#9B8ACA"/>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNumber}
                            placeholder="Location"
                        />
                        <Ionicons name="md-close-outline" size={22} color="#3C3C43"/>
                    </View>
                    <Profile
                        hiddenName={true}
                        hiddenSocial={true}
                        onPress={() => navigation.navigate('Profile', {userId: userId})}
                        userId={userId}
                    />
                </View>

                <View style={styles.searchAnother}>
                    <TextInput
                        style={styles.input}
                        // onChangeText={onChangeNumber}
                        placeholder="Search"
                    />
                    <TouchableOpacity style={styles.icon}>
                        <Feather name="search" size={15} color="white"/>
                    </TouchableOpacity>
                </View>
                <PetList/>
            </SafeAreaView>
        </CategoryIdProvider>
    );
}

