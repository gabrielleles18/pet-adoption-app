import {TextInput, View, TouchableOpacity, FlatList, ScrollView, SafeAreaView} from "react-native";
import styles from "./styles";
import Feed from "../../components/Feed";
import Category from "../../components/Category";
import {Ionicons} from '@expo/vector-icons';
import Profile from "../../components/Profile";
import {Feather} from '@expo/vector-icons';
import {DataStore} from '@aws-amplify/datastore';
import {Category as CategoryModel, Pet} from '../../src/models';
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Auth} from "aws-amplify";

export default function HomeScreen() {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [userId, setUserId] = useState<String>('');
    const navigation = useNavigation();

    useEffect(() => {
        //Categories
        const fetchCategories = async () => {
            return await DataStore.query(CategoryModel);
        }
        fetchCategories().then(setCategories);

        //Pets
        const fetchPets = async () => {
            return await DataStore.query(Pet);
        };
        fetchPets().then(setPets);

        //User
        const fetchUser = async () => {
            const userData = await Auth.currentAuthenticatedUser();
            return userData.attributes.sub.toString();
        }

        fetchUser().then(setUserId);
    }, []);

    return (
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

            <FlatList
                data={categories}
                renderItem={({item}) => <Category data={item}/>}
                ItemSeparatorComponent={
                    () => <View style={{width: 10}}/>
                }
                horizontal
                style={styles.flatList}
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.feed}>

                <FlatList
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    data={pets}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => <Feed data={item}/>}
                    ItemSeparatorComponent={
                        () => <View style={{width: 10}}/>
                    }
                    style={styles.flatList}
                    numColumns={2}
                />
            </View>
        </SafeAreaView>
    );
}

