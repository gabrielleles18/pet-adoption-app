import styles from "./styles";
import {View} from '../../components/Themed';
import React, {useContext, useEffect, useState} from "react";
import {Image, Text, TouchableOpacity} from "react-native";
import {DataStore} from "@aws-amplify/datastore";
import {Images as ImagesModel, Pet} from "../../src/models";
import {GeneralContext} from "../../contexts/General";
import Profile from "../../components/Profile";
import {S3Image} from "aws-amplify-react-native";
import Modal from "react-native-modal";
import {AntDesign} from '@expo/vector-icons';

export default function AdoptionScreen() {
    const [petsProcesso, setPetsProcesso] = useState([]);
    // @ts-ignore
    const {userId} = useContext(GeneralContext);
    const [imagen, setImagen] = useState('');

    const [modalVisible, setModalVisible] = useState<Array<any> | []>([]);

    useEffect(() => {
        const fetchPets = async () => {
            return await DataStore.query(Pet, item => item.userIDAdoption('eq', userId));
        };
        fetchPets().then(setPetsProcesso);
    }, []);

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
                            setImagen(imagesData[0].imageUri);
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

                            <Modal style={{flex: 1}} isVisible={modalVisible[index]} hasBackdrop>
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
            </View>
        </View>
    );
}