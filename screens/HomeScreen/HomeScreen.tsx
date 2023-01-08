import {Animated, Easing, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "./styles";
import {AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons} from '@expo/vector-icons';
import Profile from "../../components/Profile";
import React, {useContext, useRef, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Auth} from "aws-amplify";
import CategoryIdProvider from "../../contexts/categoryPet";
import PetslistProvider from "../../contexts/Petslist";
import PetList from "../../components/PetList";
import SearchLocation from "../../components/SearchLocation";
import Search from "../../components/Search";
import {BorderlessButton} from "react-native-gesture-handler";
import {GeneralContext} from "../../contexts/General";

export default function HomeScreen() {
    const navigation = useNavigation();
    const offsetValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;
    const [showMenu, setShowMenu] = useState(false);
    // @ts-ignore
    const {userId} = useContext(GeneralContext);

    const signOut = async () => {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <View style={styles.father}>
            <View style={styles.menu}>
                <View style={styles.itens}>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Adoption')}>
                        <MaterialIcons name="pets" size={24} color="black" style={styles.menuIcons}/>
                        <Text style={styles.menuTitle}>Adoption</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Registration')}>
                        <AntDesign name="plussquare" size={24} color="black" style={styles.menuIcons}/>
                        <Text style={styles.menuTitle}>Add pet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}
                                      onPress={() => navigation.navigate('Profile', {userId: userId})}>
                        <FontAwesome name="user" size={24} color="black" style={styles.menuIcons}/>
                        <Text style={styles.menuTitle}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.row}>
                        <Ionicons name="settings" size={24} color="black" style={styles.menuIcons}/>
                        <Text style={styles.menuTitle}>Settings</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.logoff}
                    onPress={signOut}
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

