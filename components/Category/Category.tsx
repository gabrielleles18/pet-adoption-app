import {CategoryContainer, Title, ContainerImage} from './styles';
import {Image} from "react-native";
import ImageDogGreen from "../../assets/images/category/dog-green.png";
import ImageDogGray from "../../assets/images/category/dog-gray.png";

interface DataPros {
    name: string;
    image: string;
    isActive: boolean;
}

interface CategoryProps {
    data: DataPros,
    rest?: any
}

export default function Category({data: {isActive, name, image}, ...rest}: CategoryProps) {

    const imagens = {
        dogs: {
            green: ImageDogGreen,
            gray: ImageDogGray
        }
    }

    return (
        <CategoryContainer {...rest}>
            <ContainerImage isActive={isActive}>
                <Image source={ImageDogGray} style={{width: 35}} resizeMode='contain'/>
            </ContainerImage>
            <Title>{name}</Title>
        </CategoryContainer>
    );
}