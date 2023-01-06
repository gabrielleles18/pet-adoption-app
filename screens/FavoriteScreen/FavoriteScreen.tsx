import {FlatList, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import Feed from "../../components/Feed";
import {DataStore} from "@aws-amplify/datastore";
import {EagerPet, Favorites, Pet} from "../../src/models";
import {Auth} from "aws-amplify";
import {GeneralContext} from "../../contexts/General";
import styles from "./styles";

export default function FavoriteScreen() {
    const [petslist, setPetslist] = useState([]);
    const [favorite, setFavorite] = useState([]);
    // @ts-ignore
    const {userId} = useContext(GeneralContext);

    const fetchPets = async () => {
        let result: EagerPet[] = [];
        await Promise.all(favorite.map(async (v) => {
            // @ts-ignore
            let result3 = await DataStore.query(Pet, item => item.id('eq', v.favoritesPetId.toString()));
            result = [...result, result3[0]];
        }));
        return result;
    };

    useEffect(() => {
        const fetchFavorite = async () => {
            // @ts-ignore
            return await DataStore.query(Favorites, item => item.favoritesUserFavoriteId('eq', userId.toString()));
        }

        // @ts-ignore
        fetchFavorite().then(setFavorite);
        if (favorite.length > 0) {
            // @ts-ignore
            fetchPets().then(setPetslist);
        }
    }, []);

    useEffect(() => {
        // @ts-ignore
        fetchPets().then(setPetslist);
    }, [favorite]);

    return (
        <View style={styles.container}>
            <FlatList
                style={{zIndex: 9}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={petslist}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <Feed data={item}/>}
                ItemSeparatorComponent={
                    () => <View style={{width: 10}}/>
                }
                numColumns={2}
                ListEmptyComponent={<Text>No pets found🙄</Text>}
            />
        </View>
    );
}

