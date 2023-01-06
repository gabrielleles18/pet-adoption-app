import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Amplify} from 'aws-amplify'
import {withAuthenticator} from 'aws-amplify-react-native';

Amplify.configure(awsExports);

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import awsExports from './src/aws-exports';
import GeneralProvider from "./contexts/General";


function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <GeneralProvider>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme}/>
                    <StatusBar/>
                </SafeAreaProvider>
            </GeneralProvider>
        );
    }
}

export default withAuthenticator(App);