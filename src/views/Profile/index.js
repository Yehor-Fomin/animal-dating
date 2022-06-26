import React from 'react';
import {View, Text} from 'react-native';
import * as S from './styled';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const {navigate} = useNavigation();

  return (
    <S.Container>
      <Text
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() => navigate('PersonalProfile')}>
        Profile
      </Text>
      <Text
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() =>
          navigate('Home', {
            onlyMy: true,
          })
        }>
        My advertisements
      </Text>
      <Text
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 10,
          marginBottom: 10,
        }}
        onPress={() =>
          navigate('Home', {
            onlyMy: false,
          })
        }>
        Home
      </Text>
    </S.Container>
  );
};
