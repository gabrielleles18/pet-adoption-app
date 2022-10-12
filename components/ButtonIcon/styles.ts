// @ts-ignore
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';

export const ButtonContainer = styled.TouchableOpacity`
  height: 50px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.light.primaryLight};
    //background-color: ${(props: any) => props.cor};
  font-weight: bold;
  flex-direction: row;
`;

export const Text = styled.Text`
  font-weight: 500;
  letter-spacing: 0.8px;
  color: ${Colors.light.textWhite};
  font-size: 14px;
  margin-left: 10px;
`;

