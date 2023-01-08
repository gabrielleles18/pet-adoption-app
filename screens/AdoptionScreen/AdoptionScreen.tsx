import styles from "./styles";
import {View} from '../../components/Themed';
import React, {useContext, useEffect, useState} from "react";
import {Text, TouchableOpacity} from "react-native";
import {DataStore} from "@aws-amplify/datastore";
import {Images as ImagesModel, Pet as PetModel, Pet} from "../../src/models";
import {GeneralContext} from "../../contexts/General";
import Profile from "../../components/Profile";
// @ts-ignore
import {S3Image} from "aws-amplify-react-native";
import Modal from "react-native-modal";
import {AntDesign} from '@expo/vector-icons';
import ButtonIcon from "../../components/ButtonIcon";

//status
// 0 - disponivel
// 1 - adotado
// 2 - em processo de adoção
export default function AdoptionScreen() {
    const [petsProcesso, setPetsProcesso] = useState<any | []>([]);
    const [petsMeusPetAdocao, setPetsMeusPetAdocao] = useState<any | []>([]);
    // @ts-ignore
    const {userId} = useContext(GeneralContext);
    const [imagen, setImagen] = useState('');

    const [modalVisible, setModalVisible] = useState<Array<any> | []>();
    const [modalVisible2, setModalVisible2] = useState<Array<any> | []>([]);

    useEffect(() => {
        const meusPetAdocao = async () => {
            // @ts-ignore
            return await DataStore.query(Pet, (item) => item.and(item => [
                item.userID('eq', userId),
                item.status('eq', 2),
                item.userIDAdoption('ne', null),
            ]));
        }
        meusPetAdocao().then(setPetsMeusPetAdocao);
        console.log(petsMeusPetAdocao);
    }, [petsProcesso]);

    useEffect(() => {
        const fetchPets = async () => {
            // @ts-ignore
            return await DataStore.query(Pet, (item) => item.and(item => [
                item.userIDAdoption('eq', userId),
                item.status('eq', 2),
            ]));
        };
        fetchPets().then(setPetsProcesso);
    }, []);

    const changeStatus = (petItem: any, index: number) => {
        //status
        // 0 - disponivel
        // 1 - adotado
        // 2 - em processo de adoção
        const petUpdated = async () => {
            await DataStore.save(PetModel.copyOf(petItem, updatedPetModel => {
                updatedPetModel.status = 1
            }));
        }
        petUpdated().then();

        let newModalVisible2 = [...modalVisible2];
        newModalVisible2[index] = false;
        setModalVisible2(newModalVisible2);
    }

    return (
        <View style={styles.container}>
            <View style={styles.processo}>
                <Text style={styles.title}>Processo de adoção</Text>
                {petsProcesso?.map((item: any, index: any) => {
                    const fetchData = async () => {
                        const imagesData = await DataStore.query(ImagesModel, itemImage => itemImage.petID('eq', item.id), {
                            limit: 1
                        });
                        if (imagesData.length > 0) {
                            const imageUri = imagesData[0].imageUri ?? '';
                            setImagen(imageUri);
                        }
                    }
                    fetchData().then();

                    return (
                        <TouchableOpacity key={index} style={styles.items} onPress={() => {
                            let newModalVisible = [...modalVisible];
                            if (newModalVisible[index] === true) {
                                newModalVisible[index] = false;
                            } else {
                                newModalVisible[index] = true
                            }
                            setModalVisible(newModalVisible);
                        }}>
                            <View style={styles.pet}>
                                <S3Image
                                    style={{width: 70, height: 50, borderRadius: 5}}
                                    imgKey={imagen}
                                    resizeMode='cover'
                                />
                                <View style={{paddingLeft: 10}}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.breed}>{item.breed}</Text>
                                </View>
                            </View>
                            <Profile userId={item.userId} hiddenSocial/>

                            <Modal style={{flex: 1}} isVisible={modalVisible[index] ?? false} hasBackdrop>
                                <View style={styles.modal}>
                                    <TouchableOpacity onPress={() => {
                                        let newModalVisible = [...modalVisible];
                                        newModalVisible[index] = false;
                                        setModalVisible(newModalVisible);
                                    }} style={styles.close}>
                                        <AntDesign name="closecircle" size={24} color="#6852A5"/>
                                    </TouchableOpacity>
                                    <Text style={styles.status}>Status</Text>
                                    <Text style={styles.msn}>Aguardando resposta do tutor</Text>

                                    <Text style={styles.text}>Caso necessário entre em contato com o tutor</Text>
                                    <Profile userId={item.userID}/>
                                    <Text style={styles.alert}>
                                        <Text style={{color: 'red'}}>Adoção responsavel:</Text> Adotar um pet requer
                                        tempo, esforço e dedicação
                                        para fornecer ao animal um lar saudável e seguro, alimentação adequada e
                                        cuidados médicos. É preciso considerar o impacto do animal na rotina da família
                                        e se há recursos financeiros suficientes para sustentar as necessidades do pet.
                                    </Text>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.processo}>
                <Text style={styles.title}>Seus Pets para doação</Text>
                {petsMeusPetAdocao?.map((item: any, index: any) => {
                    const fetchData = async () => {
                        const imagesData = await DataStore.query(ImagesModel, itemImage => itemImage.petID('eq', item.id), {
                            limit: 1
                        });
                        if (imagesData.length > 0) {
                            const imageUri = imagesData[0].imageUri ?? '';
                            setImagen(imageUri);
                        }
                    }
                    fetchData().then();

                    return (
                        <TouchableOpacity key={index} style={styles.items} onPress={() => {
                            let newModalVisible2 = [...modalVisible2];
                            if (newModalVisible2[index] === true) {
                                newModalVisible2[index] = false;
                            } else {
                                newModalVisible2[index] = true
                            }
                            setModalVisible2(newModalVisible2);
                        }}>
                            <View style={styles.pet}>
                                <S3Image
                                    style={{width: 70, height: 50, borderRadius: 5}}
                                    imgKey={imagen}
                                    resizeMode='cover'
                                />
                                <View style={{paddingLeft: 10}}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.breed}>{item.breed}</Text>
                                </View>
                            </View>
                            <Profile userId={item.userId} hiddenSocial/>

                            <Modal style={{flex: 1}} isVisible={modalVisible2[index]} hasBackdrop>
                                <View style={styles.modal}>
                                    <TouchableOpacity onPress={() => {
                                        let newModalVisible2 = [...modalVisible2];
                                        newModalVisible2[index] = false;
                                        setModalVisible2(newModalVisible2);
                                    }} style={styles.close}>
                                        <AntDesign name="closecircle" size={24} color="#6852A5"/>
                                    </TouchableOpacity>
                                    <Text style={styles.status}>Status</Text>
                                    <Text style={styles.msn}>Aguardando resposta do tutor</Text>

                                    <Text style={styles.text}>Caso necessário entre em contato com o adotante</Text>
                                    <Profile userId={item.userIDAdoption}/>
                                    <View style={{marginBottom: 15}}></View>
                                    <ButtonIcon text={'Finalizar adoção'} onPress={() => changeStatus(item, index)}/>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}