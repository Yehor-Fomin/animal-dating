import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #7b1fa2;
  justify-content: center;
  align-items: center;
`;

export const InputArea = styled.View`
  width: 100%;
  padding: 40px;
`;

export const ButtonLogin = styled.TouchableOpacity`
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;

export const ButtonLoginText = styled.Text`
  font-size: 18px;
  color: #41c300;
  font-weight: bold;
`;

export const SignMessageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const SignMessageButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const SignMessageButtonTextBold = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  margin-left: 5px;
`;
