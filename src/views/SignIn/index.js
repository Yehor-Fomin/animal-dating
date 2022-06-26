import React, {useState} from 'react';
import * as S from './styled';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {api} from '../../../api';

import SignInput from '../../components/SignInput';
import {Button} from 'react-native';

export default () => {
  const navigation = useNavigation();
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignMessageClick = () => {
    navigation.reset({
      routes: [{name: 'SignUp'}],
    });
  };

  const handleLogin = async () => {
    if (emailField != '' && passwordField != '') {
      console.log('test');
      try {
        const response = await api.post('auth/login', {
          emailOrPhone: emailField,
          password: passwordField,
        });
        console.log(response, 'response');
        if (response?.token) {
          AsyncStorage.setItem('token', response?.token);
          navigation.reset({
            routes: [{name: 'MainDrawer'}],
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <S.Container>
      <S.InputArea>
        <SignInput
          placeholder="Email or phone"
          value={emailField}
          onChangeText={(t) => setEmailField(t)}
        />

        <SignInput
          placeholder="Password"
          value={passwordField}
          onChangeText={(t) => setPasswordField(t)}
          password={true}
        />
        <S.ButtonLogin onPress={handleLogin}>
          <S.ButtonLoginText>LOGIN</S.ButtonLoginText>
        </S.ButtonLogin>
        <S.SignMessageButton onPress={handleSignMessageClick}>
          <S.SignMessageButtonText>
            Dont have an account?
          </S.SignMessageButtonText>
          <S.SignMessageButtonTextBold>Register</S.SignMessageButtonTextBold>
        </S.SignMessageButton>
      </S.InputArea>
    </S.Container>
  );
};
