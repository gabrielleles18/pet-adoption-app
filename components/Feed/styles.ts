// @ts-ignore
import styled from 'styled-components/native';
import Colors from "../../constants/Colors";
import {StyleSheet} from "react-native";

export const FeedContainer = styled.TouchableOpacity`
  width: 47%;
  border: 1px solid #EFEFF0;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 25px;
`;

export const ImageContainer = styled.View`
  height: 120px;
  width: 100%;
  position: relative;
`;

export const Favorite = styled.TouchableOpacity`
  width: 31px;
  height: 31px;
  border-radius: 31px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #fff;
  margin: 10px;
  right: 0;
`;

export const Content = styled.View`
  padding: 10px 10px 15px 10px;
`;

export const Category = styled.Text`
  height: 22px;
  padding: 2px 16px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  color: ${(props: any) => props.sex == 'male' ? Colors.light.segundary : Colors.light.primary};
  background-color: ${(props: any) => props.sex == 'male' ? Colors.light.segundaryLight : Colors.light.primaryLightLight};
`;

export const styles = StyleSheet.create({
    name: {
        fontWeight: '500',
        fontSize: 18,
        marginTop: 8
    },
    breed: {
        fontSize: 14,
        fontWeight: '400'
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
