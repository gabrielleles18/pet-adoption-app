import {ButtonContainer, Text} from './styles';
import {MaterialIcons} from '@expo/vector-icons';

interface ButtonIconProps {
    text: string;
    materialIcon?: string;
    rest?: any;
}

export default function ButtonIcon({text, materialIcon,...rest}: ButtonIconProps) {
    // @ts-ignore
    return (
        <ButtonContainer {...rest}>
            {materialIcon && <MaterialIcons name={materialIcon} size={17} color="white"/>}
            <Text>{text}</Text>
        </ButtonContainer>
    );
}