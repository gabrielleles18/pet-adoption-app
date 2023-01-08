import Feed from "../Feed";
import {FlatList, Text, View} from "react-native";
import Category from "../Category";
import {useContext, useEffect, useState} from "react";
import {DataStore} from "@aws-amplify/datastore";
import {Category as CategoryModel} from "../../src/models";
import {PetslistContext} from "../../contexts/Petslist";

export default function PetList() {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    //@ts-ignore
    const {petslist, setPetslist} = useContext(PetslistContext);

    useEffect(() => {
        //Categories
        const fetchCategories = async () => {
            return await DataStore.query(CategoryModel);
        }
        fetchCategories().then(setCategories);
    }, []);

    return (
        <>
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