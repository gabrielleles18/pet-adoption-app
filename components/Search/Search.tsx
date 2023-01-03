import {styles} from './styles';
import {TextInput, TouchableOpacity, View} from "react-native";
import React, {useContext} from "react";
import {Feather} from "@expo/vector-icons";
import {DataStore} from "@aws-amplify/datastore";
import {Pet} from "../../src/models";
import {PetslistContext} from "../../contexts/Petslist";

export default function Search() {
    // @ts-ignore
    const {petslist, setPetslist} = useContext(PetslistContext);
    const [search, setSearch] = React.useState('');

    const findPet = () => {
        const fetchPets = async () => {
            return await DataStore.query(Pet, item => item.name('beginsWith', search));
        }
        fetchPets().then(setPetslist);
    }

    return (
        <View style={styles.searchAnother}>
            <TextInput
                style={styles.input}
                onChangeText={setSearch}
                placeholder="Search for name"
            />
            <TouchableOpacity style={styles.icon} onPress={findPet}>
                <Feather name="search" size={15} color="white"/>
            </TouchableOpacity>
        </View>
    );
}