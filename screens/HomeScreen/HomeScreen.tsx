import {SafeAreaView, TextInput, TouchableOpacity, View, Animated, Easing, Text, ScrollView} from "react-native";
import styles from "./styles";
import {Feather, Ionicons} from '@expo/vector-icons';
import Profile from "../../components/Profile";
import React, {useEffect, useState, useRef} from "react";
import {useNavigation} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import CategoryIdProvider from "../../contexts/categoryPet";
import PetslistProvider from "../../contexts/Petslist";
import PetList from "../../components/PetList";
import SearchLocation from "../../components/SearchLocation";
import Search from "../../components/Search";
import {BorderlessButton} from "react-native-gesture-handler";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

export default function HomeScreen() {
    const [userId, setUserId] = useState<String>('');
    const navigation = useNavigation();
    const offsetValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        //User
        const fetchUser = async () => {
            const userData = await Auth.currentAuthenticatedUser();
            return userData.attributes.sub.toString();
        }

        fetchUser().then(setUserId);
    }, []);

    return (
        <View style={styles.father}>
            <View style={styles.menu}>
                <View style={styles.itens}>
                    <TouchableOpacity>
                        <View style={styles.row}>
                            <Feather
                                name='feather'
                                color='black'
                                size={24}
                                style={styles.menuIcons}
                            />
                            <Text style={styles.menuTitle}>Titulo</Text>
                        </View>
                        <View style={styles.row}>
                            <Feather
                                name='feather'
                                color='black'
                                size={24}
                                style={styles.menuIcons}
                            />
                            <Text style={styles.menuTitle}>Titulo 23</Text>
                        </View>
                        <View style={styles.line}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.logoff}
                    onPress={() => navigation.navigate('Singin')}
                >
                    <Text style={[styles.menuTitle, {marginRight: 10}]}>Sign-out</Text>
                    <Feather
                        name="arrow-right"
                        color='white'
                        size={24}
                    />
                </TouchableOpacity>
            </View>
            <Animated.View style={{
                flexGrow: 1,
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
                borderRadius: showMenu ? 15 : 0,
                transform: [
                    {scale: scaleValue},
                    {translateX: offsetValue},
                    {rotateY: showMenu ? '-15deg' : '0deg'},
                ]
            }}>
                <Animated.View style={{
                    transform: [{
                        translateY: closeButtonOffset
                    }],
                    bottom: showMenu ? -30 : 0
                }}>
                    <CategoryIdProvider>
                        <PetslistProvider>
                            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                                <View style={styles.header}>
                                    <TouchableOpacity onPress={() => {
                                        // Do Actions Here....
                                        // Scaling the view...
                                        Animated.timing(scaleValue, {
                                            toValue: showMenu ? 1 : 0.88,
                                            duration: 150,
                                            useNativeDriver: true
                                        })
                                            .start()

                                        Animated.timing(offsetValue, {
                                            // YOur Random Value...
                                            toValue: showMenu ? 0 : 200,
                                            duration: 300,
                                            easing: Easing.elastic(1),
                                            useNativeDriver: true
                                        })
                                            .start()

                                        Animated.timing(closeButtonOffset, {
                                            // YOur Random Value...
                                            toValue: !showMenu ? -30 : 0,
                                            duration: 300,
                                            easing: Easing.elastic(1),
                                            useNativeDriver: true
                                        })
                                            .start()

                                        setShowMenu(!showMenu);
                                    }}>
                                        <BorderlessButton>
                                            <Ionicons name={showMenu ? 'close' : 'md-menu'} size={35} color="#5F5B5B"/>
                                        </BorderlessButton>
                                    </TouchableOpacity>
                                    <SearchLocation/>
                                    <Profile
                                        hiddenName={true}
                                        hiddenSocial={true}
                                        onPress={() => navigation.navigate('Profile', {userId: userId})}
                                        userId={userId}
                                    />
                                </View>
                                <Search/>
                                <PetList/>
                            </ScrollView>
                        </PetslistProvider>
                    </CategoryIdProvider>
                </Animated.View>
            </Animated.View>
        </View>
    );
}

