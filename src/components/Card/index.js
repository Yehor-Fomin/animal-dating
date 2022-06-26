import React from 'react';
import * as S from './styled';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  row: {
    width: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ({data}) => {
  const navigation = useNavigation();
  const handleOneAnnouncement = async () => {
    navigation.navigate('Announcement', {data: data});
  };

  console.log(data.images);

  return (
    <S.CardArea onPress={handleOneAnnouncement}>
      <S.CardImage
        source={{uri: `data:image/jpeg;base64,${data?.images[0]}`}}
      />
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <View style={styles.row}>
          <S.CardPrice>Price: </S.CardPrice>
          <S.CardPrice>$ {data?.price},00</S.CardPrice>
        </View>
        <View style={styles.row}>
          <S.CardPrice>Type: </S.CardPrice>
          <S.CardDate>{data?.type}</S.CardDate>
        </View>
        <View style={styles.row}>
          <S.CardPrice>Alias: </S.CardPrice>
          <S.CardDate>{data?.alias}</S.CardDate>
        </View>
        <View style={styles.row}>
          <S.CardDate>Age:</S.CardDate>
          <S.CardDate>{data?.age}</S.CardDate>
        </View>
      </View>
    </S.CardArea>
  );
};
