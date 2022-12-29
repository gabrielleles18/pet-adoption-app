import Feed from "../Feed";
import {FlatList, Text, View} from "react-native";
import Category from "../Category";
import {useContext, useEffect, useState} from "react";
import {DataStore} from "@aws-amplify/datastore";
import {Category as CategoryModel, Pet} from "../../src/models";
import {CategoryIdContext} from "../../contexts/categoryPet";

export default function PetList() {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    // @ts-ignore
    const {categoryId, setCategoryId} = useContext(CategoryIdContext);

    useEffect(() => {
        //Categories
        const fetchCategories = async () => {
            return await DataStore.query(CategoryModel);
        }
        fetchCategories().then(setCategories);
    }, []);

    useEffect(() => {
        //Pets
        const fetchPets = async () => {
            if (categoryId === '') {
                return await DataStore.query(Pet);
            } else {
                return await DataStore.query(Pet, item => item.petCategoryId('eq', categoryId), {
                    limit: 10
                });
            }

            // if  (false){
            //     return await DataStore.query(Pet, (item) => item.and(item =>[
            //         item.petCategoryId('eq', categoryId),
            //     ]));
            // }
        };
        fetchPets().then(setPets);
    }, [categoryId]);

    return (
        <>
            <FlatList
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={pets}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <Feed data={item}/>}
                ItemSeparatorComponent={
                    () => <View style={{width: 10}}/>
                }
                numColumns={2}
                ListHeaderComponent={
                    <FlatList
                        data={categories}
                        renderItem={({item}) => <Category data={item}/>}
                        ItemSeparatorComponent={
                            () => <View style={{width: 15}}/>
                        }
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                }
                ListEmptyComponent={<Text>No pets found🙄</Text>}
            />
        </>
    );
}