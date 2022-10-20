import styles from "./styles";
import {View} from '../../components/Themed';
import {useState} from "react";
import {SafeAreaView, Image, TouchableOpacity, TextInput, Text} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import {Picker} from '@react-native-picker/picker';
import ButtonIcon from "../../components/ButtonIcon";

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
                            <Picker.Item label="Month" value="month"/>
                            <Picker.Item label="Year" value="year"/>
                        </Picker>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Weight</Text>
                    <TextInput
                        keyboardType='number-pad'
                        placeholder='3kg'
                        value={weight}
                        onChangeText={weight => setWeight(weight)}
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
                <ButtonIcon text='Save'/>
            </View>
        </SafeAreaView>
    );
}