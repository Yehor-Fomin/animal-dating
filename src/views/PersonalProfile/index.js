import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {authInstance} from '../../../api';
import * as S from '../SignIn/styled';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
  },
});

const PersonalProfile = () => {
  const {navigate} = useNavigation();
  const [me, setMe] = useState();

  const getUser = async () => {
    const user = await authInstance.get('user');
    setMe(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!me) {
    return (
      <View
        style={{
          paddingVertical: 20,
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: 'gray',
      }}>
      <View style={styles.row}>
        <Text>Name:</Text>
        <Text>{me?.name}</Text>
      </View>
      <View style={styles.row}>
        <Text>Surname:</Text>
        <Text>{me?.surname}</Text>
      </View>
      <View style={styles.row}>
        <Text>Email:</Text>
        <Text>{me?.email}</Text>
      </View>
      <View style={styles.row}>
        <Text>Phone:</Text>
        <Text>{me?.phone}</Text>
      </View>
      <S.SignMessageButton
        onPress={async () => {
          await AsyncStorage.removeItem('token');
          navigate('SignIn');
        }}>
        <S.SignMessageButtonTextBold>Logout</S.SignMessageButtonTextBold>
      </S.SignMessageButton>
    </View>
  );
};

export default PersonalProfile;
