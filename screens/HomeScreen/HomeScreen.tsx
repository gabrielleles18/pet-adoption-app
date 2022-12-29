import {SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {Feather, Ionicons} from '@expo/vector-icons';
import Profile from "../../components/Profile";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import CategoryIdProvider from "../../contexts/categoryPet";
import PetList from "../../components/PetList";
import {Picker} from "@react-native-picker/picker";
import {Category as CategoryModel} from "../../src/models";
import axios from "axios";

export default function HomeScreen() {
    const [userId, setUserId] = useState<String>('');
    const navigation = useNavigation();
    const [estadosApi, setEstadosApi] = useState<Array<any> | []>([]);
    const [stade, setStade] = useState<Number>(0);
    const [cityApi, setCityApi] = useState<Array<any> | []>([]);
    const [city, setCity] = useState<Number>(0);
    const [showFilter, setShowFilter] = useState<Boolean>(false);

    useEffect(() => {
        //User
        const fetchUser = async () => {
            const userData = await Auth.currentAuthenticatedUser();
            return userData.attributes.sub.toString();
        }

        fetchUser().then(setUserId);

        /*ve*/
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(function (response) {
                setEstadosApi(response.data);
            }).catch(function (error) {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stade}/municipios`)
            .then(function (response) {
                setCityApi(response.data);
            }).catch(function (error) {
            console.log(error);
        });
    }, [stade]);

    const pressFilter = () => {
        if(showFilter) {
            console.log('showFilter', showFilter);
        }
        setShowFilter(!showFilter);
    }

    return (
        <CategoryIdProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Ionicons name="md-menu" size={35} color="#5F5B5B"/>
                    </TouchableOpacity>
                    <View style={styles.search}>
                        <Ionicons name="location-sharp" size={18} color="#9B8ACA"/>
                        <TextInput
                            style={styles.input}
                            // onChangeText={onChangeNumber}
                            onPressIn={() => setShowFilter(true)}
                            placeholder="Location"
                        />
                        <TouchableOpacity onPress={pressFilter}>
                            <Ionicons name={showFilter ? 'search' : 'filter'} size={20} color="#6852A5"/>
                        </TouchableOpacity>
                    </View>
                    <Profile
                        hiddenName={true}
                        hiddenSocial={true}
                        onPress={() => navigation.navigate('Profile', {userId: userId})}
                        userId={userId}
                    />
                </View>
                {showFilter && (
                    <View style={styles.filter}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Stade</Text>
                            <Picker
                                selectedValue={stade}
                                onValueChange={(itemValue, itemIndex) =>
                                    setStade(itemValue)
                                }
                                style={[styles.picker, {
                                    width: '100%',
                                    backgroundColor: '#F6F4F9',
                                    height: 42,
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    marginBottom: 10,
                                }]}
                            >
                                {estadosApi?.map((item: any) => {
                                    if (item?.nome) {
                                        return (<Picker.Item label={item?.nome} value={item?.id} key={item.id}/>);
                                    }
                                })}
                            </Picker>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.label}>City</Text>
                            <Picker
                                selectedValue={city}
                                onValueChange={(itemValue, itemIndex) =>
                                    setCity(itemValue)
                                }
                                style={[styles.picker, {
                                    width: '100%',
                                    backgroundColor: '#F6F4F9',
                                    height: 42,
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    marginBottom: 10,
                                }]}
                            >
                                {cityApi?.map((item: CategoryModel) => {
                                    if (item?.nome) {
                                        return (<Picker.Item label={item?.nome} value={item?.id} key={item.id}/>);
                                    }
                                })}
                            </Picker>
                        </View>
                    </View>
                )}

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
                <PetList/>
            </SafeAreaView>
        </CategoryIdProvider>
    );
}

