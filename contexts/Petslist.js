import React, {createContext, useContext, useEffect, useState} from "react";
import {Pet} from "../src/models";
import {DataStore} from "@aws-amplify/datastore";
import {CategoryIdContext} from "./categoryPet";

export const PetslistContext = createContext({});

function PetslistProvider({children}) {
    // @ts-ignore
    const [petslist, setPetslist] = useState([]);
    const {categoryId, setCategoryId} = useContext(CategoryIdContext);

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