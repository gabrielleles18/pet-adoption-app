import styles from "./styles";
import {View} from '../../components/Themed';
import React, {useEffect, useState} from "react";
import {Image, Text, TextInput, TouchableOpacity} from "react-native";
import ButtonIcon from "../../components/ButtonIcon";
import {DataStore} from "@aws-amplify/datastore";
import {Category as CategoryModel, Images as ImagesModel, Pet, User as UserModel} from "../../src/models";
import {useRoute} from "@react-navigation/native";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import {Storage} from "@aws-amplify/storage";
import uuid from "react-native-uuid";
import {S3Image} from "aws-amplify-react-native";

export default function ProfileScreen() {
    let favorite = false;
    const [imagens, setImagens] = useState<Array<any>>([]);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [userData, setUserData] = useState<UserModel[]>([]);
    const [image, setImage] = useState<any>('');

    const route = useRoute();
    // @ts-ignore
    const {userId} = route?.params;

    useEffect(() => {
        const fetchUser = async () => {
            const data = await DataStore.query(UserModel, item => item.id('eq', userId), {limit: 1});
            return data[0];
        }
        fetchUser().then((data) => {
            setUserData(data);
            setName(data?.name);
            setUserName(data?.userName);
            setEmail(data?.email);
            setTelefone(data?.phone);
        });
    }, []);
    const updateUser = async () => {
        const blob = await getBlob(image);
        const {key} = await Storage.put(`${uuid.v4()}.png`, blob);

        await DataStore.save(UserModel.copyOf(userData, updatedUserModel => {
            updatedUserModel.name = name;
            updatedUserModel.phone = telefone;
            updatedUserModel.image = key;
        }));
    }

    const getBlob = async (uri: any) => {
        const response = await fetch(uri);
        return await response.blob();
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result);

            if (result.uri !== undefined) {
                setImage(result.uri);
            }
        }
    };

    console.log(userData);

    return (
        <View style={styles.container}>
            <View style={styles.containerImage}>
                {image ? (
                    <Image source={{uri: image}} style={styles.image}/>
                ) : userData?.image && (
                    <S3Image imgKey={userData?.image}
                             style={styles.image}
                             resizeMode='cover'
                    />
                )}
                <TouchableOpacity style={styles.containerIcon} onPress={pickImage}>
                    <AntDesign name={`${image ? 'edit' : 'pluscircle'}`} size={20} color={Colors.light.primary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.containerForm}>
                <View style={styles.row}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        keyboardType='default'
                        value={name}
                        onChangeText={name => setName(name)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>User name</Text>
                    <TextInput
                        keyboardType='default'
                        editable={false}
                        value={userName}
                        onChangeText={value => setUserName(value)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        editable={false}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={value => setEmail(value)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput
                        keyboardType='default'
                        value={telefone.toString()}
                        onChangeText={value => setTelefone(value.toString())}
                        style={styles.input}
                    />
                </View>
                <ButtonIcon text='Save' onPress={updateUser}/>
            </View>
        </View>
    );
}