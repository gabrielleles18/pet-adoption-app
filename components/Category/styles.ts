// @ts-ignore
import styled from 'styled-components/native';
import Colors from "../../constants/Colors";

export const CategoryContainer = styled.TouchableOpacity`
  width: 65px;
  margin: 50px;
`;

export const ContainerImage = styled.View`
  width: 65px;
  height: 65px;
  background-color: ${(props: any) => props.isActive ? Colors.light.green : '#fff'};
  padding: 15px;
  border-radius: 15px;
  border: 1px solid ${(props: any) => props.isActive ? '#fff' : '#EFEFF0'} ;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${Colors.light.text};
  text-align: center;
  margin-top: 10px;
`;
