import React, {useState} from 'react';
import * as S from './styled';
import {useNavigation} from '@react-navigation/native';

import {api, authInstance} from '../../../api';

import SignInput from '../../components/SignInput';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
  const {navigate, reset} = useNavigation();
  const [phoneField, setPhoneField] = useState('');
  const [nameField, setNameField] = useState('');
  const [surname, setSurname] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignMessageClick = () => {
    reset({
      routes: [{name: 'SignIn'}],
    });
  };

  const handleSignClick = async () => {
    if (
      nameField != '' &&
      phoneField != '' &&
      emailField != '' &&
      passwordField != ''
    ) {
      await api
        .post('auth/register', {
          name: nameField,
          phone: phoneField,
          surname,
          email: emailField,
          password: passwordField,
        })
        .then(async function (res) {
          if (res?.token) {
            await AsyncStorage.setItem('token', res?.token);
            reset({
              routes: [{name: 'MainDrawer'}],
            });
          } else {
            alert(res.data.error);
          }
        });
    } else {
      alert('Oops, error');
    }
  };

  return (
    <S.Container>
      <S.InputArea>
        <SignInput
          placeholder="Name"
          value={nameField}
          onChangeText={(t) => setNameField(t)}
        />
        <SignInput
          placeholder="Surname"
          value={surname}
          onChangeText={(t) => setSurname(t)}
        />
        <SignInput
          placeholder="Phone"
          value={phoneField}
          onChangeText={(t) => setPhoneField(t)}
        />

        <SignInput
          placeholder="Email"
          value={emailField}
          onChangeText={(t) => setEmailField(t)}
        />

        <SignInput
          placeholder="Password"
          value={passwordField}
          onChangeText={(t) => setPasswordField(t)}
          password={true}
        />
        <S.ButtonLogin onPress={handleSignClick}>
          <S.ButtonLoginText>Register</S.ButtonLoginText>
        </S.ButtonLogin>
        <S.SignMessageButton onPress={handleSignMessageClick}>
          <S.SignMessageButtonText>Have an account</S.SignMessageButtonText>
          <S.SignMessageButtonTextBold>Login</S.SignMessageButtonTextBold>
        </S.SignMessageButton>
      </S.InputArea>
    </S.Container>
  );
};
