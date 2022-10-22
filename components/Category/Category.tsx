import {CategoryContainer, Title, ContainerImage} from './styles';
import {Image} from "react-native";
import ImageDogGray from "../../assets/images/category/dog-gray.png";
import {Category as CategoryModel} from '../../src/models';
import {useState} from "react";

interface CategoryProps {
    data: CategoryModel;
}

export default function Category({data: {name}}: CategoryProps) {
    const [selected, setSelected] = useState(false);
    const isActive = true;

    return (
        <CategoryContainer onPress={() => setSelected(!selected)}>
            <ContainerImage isActive={selected ? isActive : false}>
                <Image source={ImageDogGray} style={{width: 35}} resizeMode='contain'/>
            </ContainerImage>
            <Title>{name}</Title>
        </CategoryContainer>
    );
}