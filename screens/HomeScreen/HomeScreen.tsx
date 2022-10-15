import {TextInput, View, TouchableOpacity} from "react-native";
import styles from "./styles";
import Feed from "../../components/Feed";
import Category from "../../components/Category";
import {Ionicons} from '@expo/vector-icons';
import Profile from "../../components/Profile";
import {Feather} from '@expo/vector-icons';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
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
                <Profile hiddenName={true} hiddenSocial={true}/>
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

            <Category data={{
                name: 'Dog',
                isActive: true,
                image: 'dog'
            }}/>

            <View style={styles.feed}>
                <Feed data={{
                    name: 'Luna',
                    breed: 'Poodle',
                    sex: 'Male'
                }}/>
            </View>
        </View>
    );
}

