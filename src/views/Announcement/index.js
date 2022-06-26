import React, {useState, useEffect} from 'react';
import * as S from './styled';
import Header from '../../components/Header';

import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';
import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {authInstance} from '../../../api';

const styles = StyleSheet.create({
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 24,
  },
});

export default ({route}) => {
  const {navigate} = useNavigation();
  const {
    images,
    price,
    sex,
    breed,
    type,
    description,
    paid,
    alias,
    age,
    dignity,
    _id,
    userId: adOwnerUserId,
  } = route.params.data;
  const isFocused = useIsFocused();
  const isMyAd = async () => {
    const token = await AsyncStorage.getItem('token');

    return jwtDecode(token).userId === adOwnerUserId;
  };

  const trackView = async () => authInstance.post(`views/${_id}`);

  useEffect(() => {
    trackView();
  }, [isFocused]);

  return (
    <>
      <S.Container>
        <Header title />
        <S.ImageArea>
          <S.Image source={{uri: `data:image/jpeg;base64,${images[0]}`}} />
        </S.ImageArea>
        <S.InfoArea>
          <S.Price>$ {price}</S.Price>
          <S.Title>{alias}</S.Title>
        </S.InfoArea>

        <S.Separador />

        <S.DescriptionArea>
          <S.DescriptionTitle>Description</S.DescriptionTitle>
          <S.DescriptionText>{description}</S.DescriptionText>
        </S.DescriptionArea>

        <S.Separador />

        <S.LocationArea>
          <View style={styles.row}>
            <Text>Type:</Text>
            <Text>{type}</Text>
          </View>
          <View style={styles.row}>
            <Text>Breed:</Text>
            <Text>{breed}</Text>
          </View>
          <View style={styles.row}>
            <Text>Sex:</Text>
            <Text>{sex}</Text>
          </View>
          <View style={styles.row}>
            <Text>Age:</Text>
            <Text>{age} month(s)</Text>
          </View>
          <View style={styles.row}>
            <Text>Dignity:</Text>
            <Text>{dignity ? 'Yes' : 'No'}</Text>
          </View>
        </S.LocationArea>

        <S.Separador />

        {paid && (
          <S.UserAnnouncement>
            <S.UserTitle>This is a paid advertisement</S.UserTitle>
            <S.UserAnnouncementArea>
              <S.UserName>Pet dating App</S.UserName>
              <S.UserCreatedAt>
                This add is being show more often than usual
              </S.UserCreatedAt>
              <S.UserLastAcess>If you want to promote your ad</S.UserLastAcess>
              <S.Separador />
              <S.UserFullProfileButton>
                <S.UserFullProfileText>
                  Just click "promote" checkbox while creating or editing ad
                </S.UserFullProfileText>
              </S.UserFullProfileButton>
            </S.UserAnnouncementArea>
          </S.UserAnnouncement>
        )}
      </S.Container>
      {isMyAd() && (
        <S.ButtonAdd
          onPress={() => {
            navigate('Add', {
              data: route.params.data,
            });
          }}>
          <S.ButtonAddText>Edit</S.ButtonAddText>
        </S.ButtonAdd>
      )}
    </>
  );
};
