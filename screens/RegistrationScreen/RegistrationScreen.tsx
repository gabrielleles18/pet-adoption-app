import styles from "./styles";
import {View} from '../../components/Themed';
import {useEffect, useState} from "react";
import {SafeAreaView, Image, TouchableOpacity, TextInput, Text, ScrollView} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import {Picker} from '@react-native-picker/picker';
import ButtonIcon from "../../components/ButtonIcon";
import {DataStore} from "@aws-amplify/datastore";
import {Age as AgeModel, Pet} from "../../src/models";

export default function RegistrationScreen() {
    let imageUri = 'https://extra.globo.com/incoming/23064936-d88-0b2/w533h800/cachorro-estiloso-1.png';
    let iconPlus = true
    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [breed, setBreed] = useState('');
    const [address, setAddress] = useState('');
    const [weight, setWeight] = useState('');
    const [yearMonth, setYearMonth] = useState();
    const [age, setAge] = useState<Number>(0);
    const [ageDB, setAgeDB] = useState<Object>(0);
    const [about, setAbout] = useState('');

    useEffect(() => {
        const fetchAges = async () => {
            return await DataStore.query(AgeModel);
        }
        fetchAges().then(setAgeDB);
    }, []);

    const savePet = async () => {
        const newPet = await DataStore.save(new Pet({
            name,
            age,
            weight,
            sex,
            breed,
            address,
            about,
        }));

        console.log(newPet);
    }

    return (
        <ScrollView style={styles.container}>
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
                    <Text style={styles.label}>Age</Text>

                    <View style={styles.age}>
                        <TextInput
                            keyboardType='number-pad'
                            placeholder='9'
                            value={age}
                            onChangeText={(newAge) => setAge(newAge)}
                            style={[styles.input, {width: '65%'}]}
                        />
                        <Picker
                            selectedValue={yearMonth}
                            onValueChange={(itemValue, itemIndex) =>
                                setYearMonth(itemValue)
                            }
                            style={styles.picker}
                        >
                            {/*{ageDB && Object(ageDB).map((item: AgeModel) => (*/}
                            {/*    <Picker.Item label={item?.type} value={item?.id}/>*/}
                            {/*))}*/}
                        </Picker>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Weight</Text>
                    <TextInput
                        keyboardType='number-pad'
                        placeholder='3kg'
                        value={weight}
                        onChangeText={newWeight => setWeight(newWeight)}
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
                        keyboardType='addressCity'
                        placeholder='Street 129, N 89'
                        value={address}
                        onChangeText={address => setAddress(address)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>About</Text>
                    <TextInput
                        multiline
                        keyboardType='default'
                        placeholder='About the pet'
                        value={about}
                        onChangeText={about => setAbout(about)}
                        style={[styles.input, {height: 80}]}
                    />
                </View>
                <ButtonIcon text='Save' onPress={savePet}/>
            </View>
        </ScrollView>
    );
}