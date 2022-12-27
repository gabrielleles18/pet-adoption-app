import React, {createContext, useState} from "react";

export const CategoryIdContext = createContext({});

function CategoryIdProvider({children}) {
    const [categoryId, setCategoryId] = useState('');

    return (
        <CategoryIdContext.Provider value={{categoryId, setCategoryId}}>
            {children}
        </CategoryIdContext.Provider>
    );
}

export default CategoryIdProvider;