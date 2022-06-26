import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import * as S from './styled';

import Api, {api} from '../../../api';

export default () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('SignIn');
      } else {
        navigation.navigate('MainDrawer', {
          params: {
            screen: 'Home',
          },
        });
      }
    };
    checkToken();
  }, [navigation]);

  return (
    <S.Container>
      <S.Loading size="large" color="#FFF" />
    </S.Container>
  );
};
