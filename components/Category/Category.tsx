import {CategoryContainer, Title, ContainerImage} from './styles';
import {Category as CategoryModel} from '../../src/models';
import React, {useState} from "react";
import {S3Image} from "aws-amplify-react-native";

interface CategoryProps {
    data: CategoryModel;
}

export default function Category({data: {name, image}}: CategoryProps) {
    const [selected, setSelected] = useState(false);
    const isActive = true;

    return (
        <CategoryContainer onPress={() => setSelected(!selected)}>
            <ContainerImage isActive={selected ? isActive : false}>
                <S3Image imgKey={image}
                         style={{width: 50, height: 50}}
                         resizeMode='contain'
                />
            </ContainerImage>
            <Title>{name}</Title>
        </CategoryContainer>
    );
}