import React, {createContext, useContext, useEffect, useState} from "react";
import {Pet} from "../src/models";
import {DataStore} from "@aws-amplify/datastore";
import {CategoryIdContext} from "./categoryPet";
import {GeneralContext} from "./General";

export const PetslistContext = createContext({});

function PetslistProvider({children}: any) {
    // @ts-ignore
    const [petslist, setPetslist] = useState<any | []>([]);
    // @ts-ignore
    const {categoryId, setCategoryId} = useContext(CategoryIdContext);
    // @ts-ignore
    const {userId} = useContext(GeneralContext);

    useEffect(() => {
        //Pets
        const fetchPets = async () => {
            if (categoryId === '') {
                // @ts-ignore
                return await DataStore.query(Pet, (item) => item.and(item => [
                    item.userID('ne', userId),
                    item.status('eq', 0),
                ]));
            } else {
                // @ts-ignore
                return await DataStore.query(Pet, (item) => item.and(item => [
                    item.petCategoryId('eq', categoryId),
                    item.status('eq', 0),
                ]));
            }
        };
        fetchPets().then(setPetslist);
    }, [categoryId]);

    return (
        <PetslistContext.Provider value={{petslist, setPetslist}}>
            {children}
        </PetslistContext.Provider>
    );
}

export default PetslistProvider;