import {FeedContainer, ImageContainer, Favorite, Content, Category, styles} from './styles';
import {Image, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {Ionicons} from '@expo/vector-icons';
import {Text} from '../Themed';

interface FeedProps {
    name: string;
    breed: string;
    sex: string;
    favorite?: boolean;
    imageUri?: string;
}

interface DataProps {
    data: FeedProps,
    rest?: any
}

export default function Feed({data: {sex, breed, name, favorite, imageUri}, ...rest}: DataProps) {
    favorite = true;
    imageUri = 'https://extra.globo.com/incoming/23064936-d88-0b2/w533h800/cachorro-estiloso-1.png'

    return (
        <FeedContainer {...rest}>
            <ImageContainer>
                <Image
                    style={{flex: 1,}}
                    source={{uri: imageUri}}
                    resizeMode="cover"
                />
                <Favorite>
                    <AntDesign
                        name={favorite ? 'heart' : 'hearto'}
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