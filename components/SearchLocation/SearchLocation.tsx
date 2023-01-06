import {styles} from './styles';
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import React, {useEffect, useState, useContext} from "react";
import {Picker} from "@react-native-picker/picker";
import {Category as CategoryModel, Pet} from "../../src/models";
import axios from "axios/index";
import {PetslistContext} from "../../contexts/Petslist";
import {DataStore} from "@aws-amplify/datastore";
import {CategoryIdContext} from "../../contexts/categoryPet";
import {GeneralContext} from "../../contexts/General";

export default function SearchLocation() {
    const [showFilter, setShowFilter] = useState<Boolean>(false);
    const [stade, setStade] = useState<Number>(0);
    const [cityApi, setCityApi] = useState<Array<any> | []>([]);
    const [city, setCity] = useState<Number>(0);
    // @ts-ignore
    const {estadosApi} = useContext(GeneralContext);

    // @ts-ignore
    const {petslist, setPetslist} = useContext(PetslistContext);
    // @ts-ignore
    const {categoryId, setCategoryId} = useContext(CategoryIdContext);

    useEffect(() => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stade}/municipios`)
            .then(function (response) {
                setCityApi(response.data);
            }).catch(function (error) {
            console.log(error);
        });
    }, [stade]);

    const resetFilter = async () => {
        const pets = await DataStore.query(Pet);
        setPetslist(pets);
    };

    const pressFilter = () => {
        if (showFilter) {
            const fetchPets = async () => {
                if (city !== 0 && categoryId !== '') {
                    // @ts-ignore
                    return await DataStore.query(Pet, (item) => item.and(item => [
                            item.petCategoryId('eq', categoryId),
                            item.city('eq', city)
                        ]
                    ));
                } else if (city !== 0) {
                    return await DataStore.query(Pet, item => item.city('eq', parseInt(city)), {
                        limit: 10
                    });
                }
            }
            fetchPets().then(setPetslist);

        } else {
            resetFilter().then();
        }
        setShowFilter(!showFilter);
    }

    return (
        <View style={styles.container}>
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

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            setCity(0);
                            setStade(0);
                        }}>
                            <Text style={styles.buttonText}>Clear</Text>
                            <MaterialCommunityIcons name="broom" size={18} color="white"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            setShowFilter(!showFilter);
                            resetFilter().then();
                            setCity(0);
                            setStade(0);
                        }}>
                            <Text style={styles.buttonText}>Close</Text>
                            <AntDesign name="closecircle" size={18} color="white"/>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}