import {styles} from './styles';
import {Image, Text, View} from "react-native";
import { Fontisto } from '@expo/vector-icons';

interface ProfileProps {
    hiddenSocial?: boolean;
    hiddenName?: boolean;
}

export default function Profile({hiddenSocial = false, hiddenName = false}: ProfileProps) {
    const name = 'John Doe';

    return (
        <View style={styles.container}>
            <Image
                source={{uri: 'https://learn.microsoft.com/answers/storage/attachments/209536-360-f-364211147-1qglvxv1tcq0ohz3fawufrtonzz8nq3e.jpg'}}
                style={styles.image}/>
            {!hiddenName && (
                <View style={styles.info}>
                    <Text style={styles.owner}>Owner by:</Text>
                    <Text style={styles.name}>{name}</Text>
                </View>
            )}

            {!hiddenSocial && (
                <View style={styles.social}>
                    <Fontisto name="whatsapp" size={16} color="#6852A5" />
                </View>
            )}
        </View>
    );
}