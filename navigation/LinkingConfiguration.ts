/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import {LinkingOptions} from '@react-navigation/native';
import * as Linking from 'expo-linking';

import {RootStackParamList} from '../types';
import PetScreen from "../screens/PetScreen";

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.createURL('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    TabOne: {
                        screens: {
                            TabOneScreen: 'one',
                        },
                    },
                    Home: {
                        screens: {
                            HomeScreen: 'home',
                        },
                    },
                    Registration: {
                        screens: {
                            RegistrationScreen: 'registration',
                        },
                    },
                    Pet: {
                        screens: {
                            PetScreen: 'pet',
                        },
                    },
                    Profile: {
                        screens: {
                            ProfileScreen: 'profile',
                        }
                    },
                    Favorite: {
                        screens: {
                            FavoriteScreen: 'favorite',
                        }
                    }

                },
            },
            Modal: 'modal',
            NotFound: '*',
        },
    },
};

export default linking;
