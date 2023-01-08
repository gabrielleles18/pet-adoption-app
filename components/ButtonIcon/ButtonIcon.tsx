import {ButtonContainer, Text} from './styles';
import {MaterialIcons} from '@expo/vector-icons';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface ButtonIconProps extends TouchableOpacityProps {
    text: string;
    materialIcon?: string;
    rest?: any;
}

export default function ButtonIcon({text, materialIcon, ...rest}: ButtonIconProps) {
    return (
        <ButtonContainer {...rest}>
            {materialIcon && <MaterialIcons name={materialIcon} size={17} color="white"/>}
            <Text>{text}</Text>
        </ButtonContainer>
    );
}