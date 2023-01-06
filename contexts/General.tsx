import React, {createContext, useState, useEffect} from "react";
import {Auth} from "aws-amplify";
import axios from "axios";

export const GeneralContext = createContext({});

function GeneralProvider({children}: any) {
    const [userId, setUserId] = useState<String>('');
    const [estadosApi, setEstadosApi] = useState<Array<any> | []>([]);

    const fetchUser = async () => {
        const userData = await Auth.currentAuthenticatedUser();
        return userData.attributes.sub.toString();
    }
    fetchUser().then(setUserId);

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(function (response) {
                setEstadosApi(response.data);
            }).catch(function (error) {
            console.log(error);
        });
    }, []);

    return (
        <GeneralContext.Provider value={{userId, estadosApi}}>
            {children}
        </GeneralContext.Provider>
    );
}

export default GeneralProvider;