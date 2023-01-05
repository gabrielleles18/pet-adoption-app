import {FlatList, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import Feed from "../../components/Feed";
import Category from "../../components/Category";
import {DataStore} from "@aws-amplify/datastore";
import {Pet, Favorites, EagerPet} from "../../src/models";
import {Auth} from "aws-amplify";

export default function FavoriteScreen() {
    const [petslist, setPetslist] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [userId, setUserId] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await Auth.currentAuthenticatedUser();
            return userData.attributes.sub.toString();
        }

        fetchUser().then(setUserId);
        const fetchFavorite = async () => {
            // @ts-ignore
            return await DataStore.query(Favorites, item => item.favoritesUserFavoriteId('eq', userId.toString()));
        }

        fetchFavorite().then(setFavorite);

    }, []);

    useEffect(() => {
        const fetchPets = async () => {
            let result: EagerPet[] = [];
            await Promise.all(favorite.map(async (v) => {
                let result3 = await DataStore.query(Pet, item => item.id('eq', v.favoritesPetId.toString()));
                result = [...result, result3[0]];
            }));
            return result;
        };
        fetchPets().then(setPetslist);
    }, [favorite]);

    return (
        <View>
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

