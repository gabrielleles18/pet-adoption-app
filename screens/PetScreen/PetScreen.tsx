import styles from "./styles";
import {View} from '../../components/Themed';
import {Image, Text, TouchableOpacity} from 'react-native';
import {AntDesign, Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import Profile from "../../components/Profile";
import ButtonIcon from "../../components/ButtonIcon";

export default function PetScreen() {
    let favorite = false;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={styles.header}>
                    <Ionicons name="chevron-back" size={30} color="white"/>
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
                <Text style={styles.name}>Nora</Text>
                <View style={styles.addressContainer}>
                    <Ionicons name="location-sharp" size={16} color="#9B8ACA"/>
                    <Text style={styles.address}>110 N 3th St, Brooklyn, NY, USA</Text>
                </View>
                <View style={styles.details}>
                    <View style={styles.detail}>
                        <Text style={styles.detailTitle}>Age</Text>
                        <Text style={styles.detailValue}>2 years</Text>
                    </View>

                    <View style={styles.detail}>
                        <Text style={styles.detailTitle}>Weight</Text>
                        <Text style={styles.detailValue}>2 kg</Text>
                    </View>
                </View>
                <Profile/>

                <View style={styles.aboutContainer}>
                    <Text style={styles.about}>About</Text>
                    <Text style={styles.abstract}>About The Nora is a bright, sensitive dog who enjoys play with his
                        human
                        family and responds well to training. As herders bred to move cattle, they are fearless and
                        independent, herders bred to move cattle, they are fearless and independent.</Text>
                </View>
                <ButtonIcon text='Adopt' materialIcon='pets'/>
            </View>
        </View>
    );
}