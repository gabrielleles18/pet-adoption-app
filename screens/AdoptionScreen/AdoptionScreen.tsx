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

export default function AdoptionScreen() {
    const [petsProcesso, setPetsProcesso] = useState([]);
    // @ts-ignore
    const {userId} = useContext(GeneralContext);
    const [imagen, setImagen] = useState('');

    useEffect(() => {
        const fetchPets = async () => {
            return await DataStore.query(Pet, item => item.userIDAdoption('eq', userId));
        };
        fetchPets().then(setPetsProcesso);
    }, []);

    // const openModal = () => {
    //
    //     return (
    //         <Modal isVisible={true} style={{flex: 1}}>
    //             <Text>
    //                 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aut beatae dolor doloremque, ea
    //                 esse fugiat impedit ipsa ipsum iste laboriosam minima, pariatur quaerat quasi recusandae saepe sed
    //                 totam voluptate.
    //             </Text>
    //         </Modal>
    //     )
    // }

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
                        <TouchableOpacity key={index} style={styles.items}>
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
                            <Profile userId={item.userId} hiddenSocial hiddenImage/>
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