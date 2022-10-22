import {FeedContainer, ImageContainer, Favorite, Content, Category, styles} from './styles';
import {Image, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {Ionicons} from '@expo/vector-icons';
import {Text} from '../Themed';
import {Pet} from '../../src/models';
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";

interface FeedProps {
    data: Pet,
}

export default function Feed({data}: FeedProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation();
    const {sex, breed, name} = data;

    const onPress = ({data}: any) => {
        navigation.navigate('PetScreen', {data});
    }

    let imageUri = 'https://extra.globo.com/incoming/23064936-d88-0b2/w533h800/cachorro-estiloso-1.png';

    return (
        <FeedContainer onPress={() => onPress({data})}>
            <ImageContainer>
                <Image
                    style={{flex: 1,}}
                    source={{uri: imageUri}}
                    resizeMode="cover"
                />
                <Favorite onPress={() => setIsFavorite(!isFavorite)}>
                    <AntDesign
                        name={isFavorite ? 'heart' : 'hearto'}
                        size={17}
                        color={Colors.light.primaryLight}
                    />
                </Favorite>
            </ImageContainer>
            <Content>
                <View style={styles.categoryContainer}>
                    <Category sex={sex}>
                        Adult
                    </Category>
                    <Ionicons
                        name={sex == 'male' ? 'male-outline' : 'female-outline'}
                        size={17}
                        color={sex == 'male' ? Colors.light.segundary : Colors.light.primary}
                    />
                </View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.breed}>{breed}</Text>
            </Content>
        </FeedContainer>
    );
}