import styled from 'styled-components/native';

export const CardArea = styled.TouchableOpacity`
  background-color: #fff;
  width: 100%;
  flex-direction: row;
  margin-bottom: 10px;
  border-radius: 10px;
`;

export const AreaImage = styled.View;

export const CardImage = styled.Image`
  width: 150px;
  height: 150px;
  resize-mode: cover;
`;
//
// export const CardAreaInfo = styled.View`
//   //flex: 1;
//   //justify-content: space-around;
//   //margin-left: 20px;
// `;

export const CardTitle = styled.Text`
  font-size: 14px;
`;

export const CardPrice = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const CardDate = styled.Text`
  color: #757575;
  font-size: 12px;
`;
