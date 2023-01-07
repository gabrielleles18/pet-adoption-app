import {styles} from './styles';
import {Image, Text, View, TouchableOpacity, Linking} from "react-native";
import {Fontisto} from '@expo/vector-icons';
import {Auth, DataStore} from "aws-amplify";
import React, {useEffect, useState} from "react";
import {User} from "../../src/models";
import {S3Image} from "aws-amplify-react-native";

interface ProfileProps {
    hiddenSocial?: boolean;
    hiddenName?: boolean;
    hiddenImage?: boolean;
    userId: string;
    onPress?: () => void;
}

export default function Profile({
                                    userId,
                                    hiddenSocial = false,
                                    hiddenName = false,
                                    hiddenImage = false,
                                    onPress
                                }: ProfileProps) {
    const [name, setName] = useState<String>('');
    const [telefone, setTelefone] = useState<String>('');
    const [imagem, setImagem] = useState<String>('');
    useEffect(() => {
        const fetchUsers = async () => {
            const userDatas = await DataStore.query(User,
                usersItem => usersItem.id('eq', userId), {
                    limit: 1
                });
            setName(userDatas[0]?.name);
            setTelefone(userDatas[0]?.phone);
            setImagem(userDatas[0]?.image);
        }
        fetchUsers().then();
    }, []);

    const whatsapp = () => {
        Linking.openURL(`whatsapp://send?phone=${telefone}`);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                {!hiddenImage && (
                    <S3Image
                        style={styles.image}
                        imgKey={imagem}
                        resizeMode='cover'
                    />
                )}
            </TouchableOpacity>

            {!hiddenName && (
                <View style={styles.info}>
                    <Text style={styles.owner}>Owner by:</Text>
                    <Text style={styles.name}>{name}</Text>
                </View>
            )}

            {!hiddenSocial && (
                <TouchableOpacity style={styles.social} onPress={whatsapp}>
                    <Fontisto name="whatsapp" size={16} color="#6852A5"/>
                </TouchableOpacity>
            )}
        </View>
    );
}