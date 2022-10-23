import styles from "./styles";
import {View} from '../../components/Themed';
import {Image, Text, TouchableOpacity} from 'react-native';
import {AntDesign, Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Profile from "../../components/Profile";
import ButtonIcon from "../../components/ButtonIcon";
import {useNavigation, useRoute} from "@react-navigation/native";

export default function PetScreen() {
    let favorite = false;
    const route = useRoute();
    const {name, breed, age, weight, sex, address, about} = route?.params?.data;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={30} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.favorite}>
                        <AntDesign
                            name={favorite ? 'heart' : 'hearto'}
                            size={17}
                            color={Colors.light.primaryLight}
                        />
                    </TouchableOpacity>
                </View>
                <Image
                    source={{uri: 'https://learn.microsoft.com/answers/storage/attachments/209536-360-f-364211147-1qglvxv1tcq0ohz3fawufrtonzz8nq3e.jpg'}}
                    style={styles.image}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.addressContainer}>
                    <Ionicons name="location-sharp" size={16} color="#9B8ACA"/>
                    <Text style={styles.address}>{address}</Text>
                </View>
                <View style={styles.details}>
                    <View style={styles.detail}>
                        <Text style={styles.detailTitle}>Age</Text>
                        <Text style={styles.detailValue}>{age} years</Text>
                    </View>

                    <View style={styles.detail}>
                        <Text style={styles.detailTitle}>Weight</Text>
                        <Text style={styles.detailValue}>{weight} kg</Text>
                    </View>

                    <View style={styles.detail}>
                        <Text style={styles.detailTitle}>Sex</Text>
                        <Text style={styles.detailValue}>{sex}</Text>
                    </View>

                    <View style={styles.detail}>
                        <Text style={styles.detailTitle}>Breed</Text>
                        <Text style={styles.detailValue}>{breed}</Text>
                    </View>
                </View>
                <Profile/>

                <View style={styles.aboutContainer}>
                    <Text style={styles.about}>About</Text>
                    <Text style={styles.abstract}>{about}</Text>
                </View>
                <ButtonIcon text='Adopt' materialIcon='pets'/>
            </View>
        </View>
    );
}