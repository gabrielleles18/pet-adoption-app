import {CategoryContainer, Title, ContainerImage} from './styles';
import {Category as CategoryModel} from '../../src/models';
import React, {useContext, useState} from "react";
// @ts-ignore
import {S3Image} from "aws-amplify-react-native";
import {CategoryIdContext} from "../../contexts/categoryPet";

interface CategoryProps {
    data: CategoryModel;
}

export default function Category({data: {id, name, image}}: CategoryProps) {
    const [selected, setSelected] = useState(false);
    const isActive = true;
    // @ts-ignore
    const {categoryId, setCategoryId} = useContext(CategoryIdContext);

    return (
        <CategoryContainer onPress={() => {
            setSelected(!selected);
            setCategoryId(id);
        }}>
            <ContainerImage isActive={categoryId === id ? isActive : false}>
                <S3Image imgKey={image}
                         style={{width: 50, height: 50}}
                         resizeMode='contain'
                />
            </ContainerImage>
            <Title>{name}</Title>
        </CategoryContainer>
    );
}