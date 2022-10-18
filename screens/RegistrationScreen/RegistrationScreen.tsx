import styles from "./styles";
import {View} from '../../components/Themed';
import {useState} from "react";
import {SafeAreaView, Image, TouchableOpacity, TextInput, Text} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import Colors from "../../constants/Colors";

export default function RegistrationScreen() {
    let imageUri = 'https://extra.globo.com/incoming/23064936-d88-0b2/w533h800/cachorro-estiloso-1.png';
    let iconPlus = true
    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [breed, setBreed] = useState('');
    const [address, setAddress] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerImage}>
                {imageUri && (
                    <Image source={{uri: imageUri}} style={styles.image}/>
                )}
                <TouchableOpacity style={styles.containerIcon}>
                    <AntDesign name={iconPlus ? 'plus' : 'minus'} size={20} color={Colors.light.primary}/>
                </TouchableOpacity>
            </View>

            <View style={styles.containerForm}>
                <View style={styles.row}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        keyboardType='default'
                        placeholder='Jonh Doe'
                        value={name}
                        onChangeText={name => setName(name)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Sex</Text>
                    <TextInput
                        keyboardType='default'
                        placeholder='Male'
                        value={sex}
                        onChangeText={sex => setSex(sex)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Breed</Text>
                    <TextInput
                        keyboardType='default'
                        placeholder='Corgi'
                        value={breed}
                        onChangeText={breed => setBreed(breed)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        keyboardType='default'
                        placeholder='Street 129, N 89'
                        value={address}
                        onChangeText={address => setAddress(address)}
                        style={styles.input}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}