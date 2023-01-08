import styles from "./styles";
import {View} from '../../components/Themed';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {AntDesign, Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Profile from "../../components/Profile";
import ButtonIcon from "../../components/ButtonIcon";
import {useNavigation, useRoute} from "@react-navigation/native";
import React, {useContext, useEffect, useState} from "react";
import {DataStore} from "aws-amplify";
import {Images as ImagesModel, Pet as PetModel} from "../../src/models";
// @ts-ignore
import {S3Image} from "aws-amplify-react-native";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {GeneralContext} from "../../contexts/General";

export default function PetScreen() {
    let favorite = false;
    const route = useRoute();
    const {id, userID, name, breed, age, weight, sex, address, abount, images} = route?.params?.data;
    const navigation = useNavigation();
    const [imagens, setImagens] = useState<Array<any>>([]);
    // @ts-ignore
    const {userId} = useContext(GeneralContext);

    useEffect(() => {
        const fetchData = async () => {
            const imagesData = await DataStore.query(ImagesModel, item => item.petID('eq', id), {
                limit: 10
            });
            setImagens(imagesData);
        }

        fetchData().then();
    }, []);

    const handlerAdoption = () => {
        //status
        // 0 - disponivel
        // 1 - adotado
        // 2 - em processo de adoção

        const petUpdated = async () => {
            const petData = route?.params?.data;
            await DataStore.save(PetModel.copyOf(petData, updatedPetModel => {
                updatedPetModel.userIDAdoption = userId;
                updatedPetModel.status = 2
            }));
        }
        petUpdated().then();
        navigation.navigate('Adoption');
    }

    return (
        <View style={[styles.container, !images ? {paddingTop: getStatusBarHeight() + 10} : {}]}>
            <View style={styles.imageContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={30} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favorite}>
                        <AntDesign
                            name={favorite ? 'heart' : 'hearto'}
                            size={17}
                            color={Colors.light.primaryLight}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={imagens}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={(item: any, index: number) => {
                        return (
                            <S3Image key={index}
                                     imgKey={item.item.imageUri}
                                     style={styles.image}
                                     resizeMode='contain'
                            />
                        )
                    }}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.addressContainer}>
                    <Ionicons name="location-sharp" size={16} color="#9B8ACA"/>
                    <Text style={styles.address}>{address}</Text>
                </View>
                <View style={styles.details}>
                    <View style={styles.detail}>
                        <Text style={styles.detailTitle}>Age</Text>
                        <Text style={styles.detailValue}>{age} years</Text>
                    </View>

                    <View style={styles.detail}>
                        <Text style={styles.detailTitle}>Weight</Text>
                        <Text style={styles.detailValue}>{weight} kg</Text>
                    </View>

                    <View style={styles.detail}>
                        <Text style={styles.detailTitle}>Sex</Text>
                        <Text style={styles.detailValue}>{sex}</Text>
                    </View>

                    <View style={styles.detail}>
                        <Text style={styles.detailTitle}>Breed</Text>
                        <Text style={styles.detailValue}>{breed}</Text>
                    </View>
                </View>
                <Profile userId={userID} hiddenSocial/>

                <View style={styles.aboutContainer}>
                    <Text style={styles.about}>About</Text>
                    <Text style={styles.abstract}>{abount}</Text>
                </View>
                <ButtonIcon text='Adopt' materialIcon='pets' onPress={handlerAdoption}/>
            </View>
        </View>
    );
}