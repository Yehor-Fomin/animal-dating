import styled from 'styled-components/native';

export const HeaderArea = styled.View`
  background-color: #7b1fa2;
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderIconMenuArea = styled.View`
  margin-left: 20px;
  width: 10%;
`;

export const HeaderIconOthersArea = styled.View`
  flex-direction: row;
  margin-right: 20px;
  justify-content: space-between;
`;

export const Text = styled.Text`
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

export const InputsArea = styled.View`
  margin: 10px;
`;

export const InputTitle = styled.Text`
  color: #000;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const TextInput = styled.TextInput`
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding-left: 10px;
`;
