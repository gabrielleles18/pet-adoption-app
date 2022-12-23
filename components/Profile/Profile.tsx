import {styles} from './styles';
import {Image, Text, View, TouchableOpacity} from "react-native";
import {Fontisto} from '@expo/vector-icons';
import {Auth, DataStore} from "aws-amplify";
import {useEffect, useState} from "react";
import {User} from "../../src/models";

interface ProfileProps {
    hiddenSocial?: boolean;
    hiddenName?: boolean;
    userId: string;
    onPress?: () => void;
}

export default function Profile({userId, hiddenSocial = false, hiddenName = false, onPress}: ProfileProps) {
    const [name, setName] = useState<String>('');

    useEffect(() => {
        const fetchUsers = async () => {
            const userDatas = await DataStore.query(User,
                usersItem => usersItem.id('eq', userId), {
                    limit: 1
                });
            setName(userDatas[0]?.name);
        }
        fetchUsers().then();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Image
                    source={{uri: 'https://learn.microsoft.com/answers/storage/attachments/209536-360-f-364211147-1qglvxv1tcq0ohz3fawufrtonzz8nq3e.jpg'}}
                    style={styles.image}/>
            </TouchableOpacity>
            {!hiddenName && (
                <View style={styles.info}>
                    <Text style={styles.owner}>Owner by:</Text>
                    <Text style={styles.name}>{name}</Text>
                </View>
            )}

            {!hiddenSocial && (
                <TouchableOpacity style={styles.social}>
                    <Fontisto name="whatsapp" size={16} color="#6852A5"/>
                </TouchableOpacity>
            )}
        </View>
    );
}