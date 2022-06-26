import React, {useState, useEffect} from 'react';
import * as S from './styled';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import Camera from '../../assets/camera.svg';

import Header from '../../components/Header';
import Card from '../../components/Card';

import Api, {authInstance} from '../../../api';
import jwtDecode from 'jwt-decode';

export default ({route}) => {
  const navigation = useNavigation();
  const onlyMy = route.params?.onlyMy;
  const [advertisements, setAdvertisements] = useState([]);
  const [alias, setAlias] = useState('');
  const [breed, setBreed] = useState('');
  const [type, setType] = useState('');
  const isFocused = useIsFocused();

  const getAnnouncements = async () => {
    setAdvertisements([]);

    await authInstance
      .get(`questionnaire/filter?alias=${alias}&breed=${breed}&type=${type}`)
      .then(async function (res) {
        if (onlyMy) {
          const token = await AsyncStorage.getItem('token');
          const id = jwtDecode(token).userId;
          console.log(onlyMy, 'onlyMy');
          console.log(id, 'id');

          setAdvertisements(res.filter((ad) => ad._id === id));
        } else {
          await setAdvertisements(res);
        }
      });
  };

  const handleButtonAdd = () => {
    navigation.navigate('Add');
  };

  useEffect(() => {
    getAnnouncements();
  }, [alias, breed, type, isFocused]);

  console.log(advertisements, 'advertisements');

  return (
    <S.Container>
      <Header
        alias={alias}
        setAlias={setAlias}
        breed={breed}
        setBreed={setBreed}
        type={setType}
        setType={setType}
      />
      <S.ViewCards>
        {advertisements?.map((item) => (
          <Card key={item._id} data={item} />
        ))}
      </S.ViewCards>
      <S.ButtonAdd onPress={handleButtonAdd}>
        <Camera width={24} height={24} fill="#FFF" />
        <S.ButtonAddText>Add</S.ButtonAddText>
      </S.ButtonAdd>
    </S.Container>
  );
};
