/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable, Text, View} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import PetScreen from '../screens/PetScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import NotificationScreen from '../screens/NotificationScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import AdoptionScreen from '../screens/AdoptionScreen';

import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="Pet" component={PetScreen} options={{headerShown: false}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{title: 'Edit Profile'}}/>
            <Stack.Screen name="Adoption" component={AdoptionScreen} options={{title: 'Adoption'}}/>
            {/*<Stack.Screen name="Favorite" component={FavoriteScreen} options={{title: 'Favorite'}}/>*/}
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].primary,
                tabBarStyle: {
                    height: 80,
                }
            }}>
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Notification"
                component={NotificationScreen}
                options={{
                    title: '',
                    headerTitle: 'Notification',
                    tabBarIcon: ({color}) => <TabBarIcon name="bell" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Registration"
                component={RegistrationScreen}
                options={{
                    title: '',
                    headerTitle: 'Registration',
                    headerShown: true,
                    tabBarStyle: {display: 'none'},
                    tabBarIcon: ({color}) => <View
                        style={{
                            width: 45,
                            height: 45,
                            backgroundColor: Colors.light.primary,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 8
                        }}>
                        <AntDesign name="plussquare" size={24} color={Colors.light.primaryLightLight}/>
                    </View>,
                }}
            />
            <BottomTab.Screen
                name="Favorite"
                component={FavoriteScreen}
                options={{
                    title: '',
                    headerTitle: 'Favorite',
                    tabBarIcon: ({color}) => <TabBarIcon name="heart" color={color}/>,
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: '',
                    headerTitle: 'Profile',
                    tabBarIcon: ({color}) => <TabBarIcon name="user" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={25} style={{marginBottom: -3}} {...props} />;
}
