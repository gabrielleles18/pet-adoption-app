import styles from "./styles";
import {View} from '../../components/Themed';
import React, {useEffect, useState} from "react";
import {SafeAreaView, Image, TouchableOpacity, TextInput, Text, ScrollView, FlatList} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import {Picker} from '@react-native-picker/picker';
import ButtonIcon from "../../components/ButtonIcon";
import {DataStore} from "@aws-amplify/datastore";
import {AgeType, Pet, Category as CategoryModel, Images as ImagesModel} from "../../src/models";
import * as ImagePicker from "expo-image-picker";
import {Storage} from "@aws-amplify/storage"
import uuid from 'react-native-uuid';
import {withAuthenticator} from 'aws-amplify-react-native';
import {Auth} from 'aws-amplify';

function RegistrationScreen() {
    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [breed, setBreed] = useState('');
    const [address, setAddress] = useState('');
    const [yearMonth, setYearMonth] = useState<String | ''>('');
    const [weight, setWeight] = useState<Number | 0>(0);
    const [age, setAge] = useState<Number | 0>(0);
    const [about, setAbout] = useState('');
    const [ageDB, setAgeDB] = useState<Array<any> | []>([]);
    const [categories, setCategories] = useState<Array<any> | []>([]);
    const [category, setCategory] = useState<String>('');
    const [images, setImages] = useState<any>([]);

    useEffect(() => {
        const fetchAges = async () => {
            return await DataStore.query(AgeType);
        }
        fetchAges().then(setAgeDB);

        const fetchCategory = async () => {
            return await DataStore.query(CategoryModel);
        }
        fetchCategory().then(setCategories);
    }, []);

    const getBlob = async (uri: any) => {
        const response = await fetch(uri);
        return await response.blob();
    }

    const savePet = async () => {
        const userData = await Auth.currentAuthenticatedUser();

        //Is saving, it's beutiful.
        const newPet = await DataStore.save(new Pet({
            userID: userData.attributes.sub,
            petCategoryId: category.toString(),
            petAgeTypeId: yearMonth.toString(),
            name,
            age: Number(age),
            weight: weight.toString(),
            sex,
            breed,
            address,
            abount: about,
        }));

        if (newPet?.userID !== undefined) {
            images?.map(async (image: any) => {
                const blob = await getBlob(image?.uri);
                const {key} = await Storage.put(`${uuid.v4()}.png`, blob);

                const newImage = await DataStore.save(new ImagesModel({
                    imageUri: key.toString(),
                    petID: newPet?.userID.toString(),
                }));
            });
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.cancelled) {
            let imagensSelected;
            imagensSelected = result.selected?.map((item: any) => {
                return {uri: item.uri};
            });

            if (result.uri !== undefined) {
                imagensSelected = [{uri: result.uri}];
            }

            setImages(imagensSelected);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerImages}>
                <View style={styles.containerImage}>
                    <TouchableOpacity style={styles.containerIcon} onPress={pickImage}>
                        <AntDesign name='pluscircle' size={20} color={Colors.light.primary}/>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={images}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    ItemSeparatorComponent={() => <View style={{width: 2.5}}/>}
                    renderItem={(item: any, index: number) => (
                        <View style={styles.containerImage} key={index}>
                            <Image source={{uri: item.item.uri}} style={styles.image}/>
                            {/*<TouchableOpacity style={styles.containerIcon} onPress={updateImage}>*/}
                            {/*    <AntDesign name='minuscircle' size={20} color={Colors.light.primary}/>*/}
                            {/*</TouchableOpacity>*/}
                        </View>
                    )}
                />
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
                            value={age.toString()}
                            onChangeText={(newAge) => setAge(Number(newAge))}
                            style={[styles.input, {width: '65%'}]}
                        />
                        <Picker
                            selectedValue={yearMonth}
                            onValueChange={(itemValue, itemIndex) =>
                                setYearMonth(itemValue)
                            }
                            style={styles.picker}
                        >
                            {ageDB?.map((item: AgeType) => {
                                if (item?.type) {
                                    return (<Picker.Item label={item?.type} value={item.id} key={item.id}/>);
                                }
                            })}
                        </Picker>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Category</Text>
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue, itemIndex) =>
                            setCategory(itemValue)
                        }
                        style={[styles.picker, {
                            width: '100%',
                            backgroundColor: '#F6F4F9',
                            height: 42,
                            borderRadius: 8,
                            overflow: 'hidden',
                            marginBottom: 10,
                        }]}
                    >
                        {categories?.map((item: CategoryModel) => {
                            if (item?.name) {
                                return (<Picker.Item label={item?.name} value={item?.id} key={item.id}/>);
                            }
                        })}
                    </Picker>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Weight</Text>
                    <TextInput
                        keyboardType='number-pad'
                        placeholder='3kg'
                        value={weight.toString()}
                        onChangeText={newWeight => setWeight(Number(newWeight))}
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

const signUpConfig = {
    signUpFields: [
        {
            label: 'Locale',
            key: 'locale',
            required: true,
            displayOrder: 2,
            type: 'string',
            placeholder: 'Enter your email',

        }
    ]
};
export default withAuthenticator(RegistrationScreen);