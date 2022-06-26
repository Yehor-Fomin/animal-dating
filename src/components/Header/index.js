import React, {useState} from 'react';
import * as S from './styled';

import MenuIcon from '../../assets/menu.svg';
import SearchIcon from '../../assets/search.svg';
import {useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-community/picker';

const animalTypes = [
  {name: 'Dog', id: 'dog'},
  {name: 'Cat', id: 'cat'},
  {name: 'Parrot', id: 'parrot'},
];

export default ({title, type, breed, alias, setType, setBreed, setAlias}) => {
  const [isSearch, setIsSearch] = useState(false);

  const {navigate} = useNavigation();
  return (
    <S.HeaderArea>
      <S.HeaderIconMenuArea>
        <TouchableOpacity onPress={() => navigate('Perfil')}>
          <MenuIcon width={24} height={24} fill="#FFF" />
        </TouchableOpacity>
      </S.HeaderIconMenuArea>
      {title && <S.Text>Advertisement</S.Text>}
      {isSearch && (
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Picker
            selectedValue={type}
            borderStyle="solid"
            borderColor="#000"
            style={{height: 50, width: 120}}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
            <Picker.Item label="Select a breed" value=" " />
            {animalTypes?.map((item, key) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
          <S.InputsArea>
            <S.TextInput
              placeholder="Toy terrier"
              onChangeText={(t) => setBreed(t)}
              value={breed}
            />
          </S.InputsArea>
          <S.InputsArea>
            <S.TextInput onChangeText={(t) => setAlias(t)} value={alias} />
          </S.InputsArea>
        </View>
      )}
      {!title && (
        <S.HeaderIconOthersArea>
          <TouchableOpacity
            onPress={() => setIsSearch((prevState) => !prevState)}>
            {isSearch ? (
              <Text>x</Text>
            ) : (
              <SearchIcon width={24} height={24} fill="#FFF" />
            )}
          </TouchableOpacity>
        </S.HeaderIconOthersArea>
      )}
    </S.HeaderArea>
  );
};
