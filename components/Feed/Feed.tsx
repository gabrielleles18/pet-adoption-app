import {Category, Content, Favorite, FeedContainer, ImageContainer, styles} from './styles';
import {View} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import {Text} from '../Themed';
import {Favorites as ModelFavorites, Images as ImagesModel, Pet} from '../../src/models';
import React, {useContext, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {DataStore} from "aws-amplify";
// @ts-ignore
import {S3Image} from "aws-amplify-react-native";
import {GeneralContext} from "../../contexts/General";

interface FeedProps {
    data: Pet,
}

export default function Feed({data}: FeedProps) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [imagen, setImagen] = useState('');
    const navigation = useNavigation();
    const {sex, breed, name} = data;
// @ts-ignore
    const {userId} = useContext(GeneralContext);

    const onPress = ({data}: any) => {
        navigation.navigate('Pet', {data});
    }

    useEffect(() => {
        const fetchData = async () => {
            const imagesData = await DataStore.query(ImagesModel, item => item.petID('eq', data.id), {
                limit: 1
            });
            if (imagesData.length > 0) {
                setImagen(imagesData[0].imageUri ?? '');
            }
        }
        fetchData().then();

        const ifFavorite = async () => {
            // @ts-ignore
            const favoriteData = await DataStore.query(ModelFavorites, (item) => item.and(item => [
                    item.favoritesUserFavoriteId('eq', userId),
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

        if (!isFavorite) {
            const saveFavorite = async () => {
                const newFavorite = await DataStore.save(new ModelFavorites({
                    favoritesPetId: petId.toString(),
                    favoritesUserFavoriteId: userId
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