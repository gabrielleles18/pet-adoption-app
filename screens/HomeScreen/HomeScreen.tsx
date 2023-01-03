import {SafeAreaView, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {Feather, Ionicons} from '@expo/vector-icons';
import Profile from "../../components/Profile";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import CategoryIdProvider from "../../contexts/categoryPet";
import PetslistProvider from "../../contexts/Petslist";
import PetList from "../../components/PetList";
import SearchLocation from "../../components/SearchLocation";
import Search from "../../components/Search";

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
            <PetslistProvider>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity>
                            <Ionicons name="md-menu" size={35} color="#5F5B5B"/>
                        </TouchableOpacity>
                        <SearchLocation/>
                        <Profile
                            hiddenName={true}
                            hiddenSocial={true}
                            onPress={() => navigation.navigate('Profile', {userId: userId})}
                            userId={userId}
                        />
                    </View>
                    <Search/>
                    <PetList/>
                </SafeAreaView>
            </PetslistProvider>
        </CategoryIdProvider>
    );
}

