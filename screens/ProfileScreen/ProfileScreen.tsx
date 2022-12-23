import styles from "./styles";
import {View} from '../../components/Themed';
import React, {useEffect, useState} from "react";
import {Text, TextInput} from "react-native";
import ButtonIcon from "../../components/ButtonIcon";
import {DataStore} from "@aws-amplify/datastore";
import {Category as CategoryModel, Images as ImagesModel, Pet, User as UserModel} from "../../src/models";
import {useRoute} from "@react-navigation/native";

export default function ProfileScreen() {
    let favorite = false;
    const [imagens, setImagens] = useState<Array<any>>([]);
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [userData, setUserData] = useState<UserModel[]>([]);

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
        // @ts-ignore
        await DataStore.save(UserModel.copyOf(userData, updatedUserModel => {
            updatedUserModel.name = name;
            updatedUserModel.email = email;
            updatedUserModel.phone = parseInt(telefone);
        }))
    }

    return (
        <View style={styles.container}>
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
                        onChangeText={value => setTelefone(value)}
                        style={styles.input}
                    />
                </View>
                <ButtonIcon text='Save' onPress={updateUser}/>
            </View>
        </View>
    );
}