import {FeedContainer, ImageContainer, Favorite, Content, Category, styles} from './styles';
import {Image, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {Ionicons} from '@expo/vector-icons';
import {Text} from '../Themed';
import {Images as ImagesModel, Pet, Favorites as ModelFavorites} from '../../src/models';
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Auth, DataStore} from "aws-amplify";
import {S3Image} from "aws-amplify-react-native";

interface FeedProps {
    data: Pet,
}

export default function Feed({data}: FeedProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [imagen, setImagen] = useState('');
    const navigation = useNavigation();
    const {sex, breed, name} = data;
    const [userId, setUserId] = useState([]);

    const onPress = ({data}: any) => {
        navigation.navigate('Pet', {data});
    }

    useEffect(() => {
        const fetchData = async () => {
            const imagesData = await DataStore.query(ImagesModel, item => item.petID('eq', data.id), {
                limit: 1
            });
            if (imagesData.length > 0) {
                setImagen(imagesData[0].imageUri);
            }
        }
        fetchData().then();

        const fetchUser = async () => {
            const userData = await Auth.currentAuthenticatedUser();
            return userData.attributes.sub.toString();
        }
        fetchUser().then(setUserId);

        const ifFavorite = async () => {
            // @ts-ignore
            const favoriteData = await DataStore.query(ModelFavorites, (item) => item.and(item => [
                    item.favoritesUserFavoriteId('eq', userId.toString()),
                    item.favoritesPetId('eq', data.id.toString())
                ]
            ));
            if (favoriteData.length > 0) {
                setIsFavorite(true);
            }
        }
        ifFavorite().then();
    }, []);

    const setFavorite = (petId: string) => {
        setIsFavorite(!isFavorite);

        console.log(isFavorite);
        if (!isFavorite) {
            const saveFavorite = async () => {
                const newFavorite = await DataStore.save(new ModelFavorites({
                    favoritesPetId: petId.toString(),
                    favoritesUserFavoriteId: userId.toString()
                }));

                // console.log(newFavorite);
            }
            saveFavorite().then();
        } else if (isFavorite) {
            const deleteFavorite = async () => {
                await DataStore.delete(ModelFavorites, (item) => item.favoritesPetId('eq', petId.toString()));
            };
            // deleteFavorite().then();
        }
    };

    return (
        <FeedContainer onPress={() => onPress({data})}>
            <ImageContainer>
                <S3Image
                    style={{width: '100%', height: '100%'}}
                    imgKey={imagen}
                    resizeMode='cover'
                />
                <Favorite onPress={() => setFavorite(data.id)}>
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