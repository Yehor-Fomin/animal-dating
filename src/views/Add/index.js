import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-community/picker';
import * as S from './styled';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import CheckBox from '@react-native-community/checkbox';

import Api, {authInstance} from '../../../api';
import {Text, View} from 'react-native';

const animalTypes = [
  {name: 'Dog', id: 'dog'},
  {name: 'Cat', id: 'cat'},
  {name: 'Parrot', id: 'parrot'},
];

const sexs = [
  {name: 'Male', id: 'male'},
  {name: 'Female', id: 'female'},
];

export default function Add({route}) {
  const data = route?.params?.data;
  const navigation = useNavigation();

  const [type, setType] = useState('');
  const [sex, setSex] = useState('');

  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [alias, setAlias] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState();
  const [isDignity, setIsDignity] = useState(false);
  const [isPaid, setIsPaid] = useState();

  useEffect(() => {
    if (data) {
      console.log(data);
      setType(data.type);
      setSex(data.sex);
      setAge(data.age);
      setBreed(data.breed);
      setAlias(data.alias);
      setPrice(String(data.price));
      setDescription(data.description);
      setImage(data.images[0]);
      setIsDignity(data.dignity);
      setIsPaid(data.paid);
    }
  }, [data]);

  const handleSubmit = async () => {
    const uploadData = {
      type,
      breed,
      alias,
      sex,
      age,
      description,
      price,
      dignity: isDignity,
      paid: isPaid,
      images: image?.data ? [image?.data] : [image],
    };
    if (data) {
      await authInstance.patch(`questionnaire/${data._id}`, uploadData);
      return navigation.navigate('Home');
    }
    if (breed && description && price) {
      const uploadData = {
        type,
        breed,
        alias,
        sex,
        age,
        description,
        price,
        dignity: isDignity,
        paid: isPaid,
        images: [image?.data],
      };

      try {
        const res = await authInstance.post('questionnaire', uploadData);
        alert('Success!');
        navigation.reset({
          routes: [{name: 'MainDrawer'}],
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Error!');
    }
  };

  const SelectImage = async () => {
    ImagePicker.showImagePicker({mediaType: 'photo'}, (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        alert(response.error);
        return;
      }

      setImage(response);
    });
  };

  return (
    <S.Container>
      <S.ImageCoverArea
        source={{
          uri: image?.uri
            ? image.uri
            : `data:image/jpeg;base64,${data?.images[0]}`,
        }}>
        <S.AddImageButton onPress={SelectImage}>
          <S.AddImageButtonText>Add image</S.AddImageButtonText>
        </S.AddImageButton>
      </S.ImageCoverArea>
      <S.FormArea>
        <S.InputsArea>
          <S.InputTitle>Description</S.InputTitle>
          <S.TextInputDesc
            multiline
            placeholder="Ex: Cute female cat, 4 years, is looking for a pair"
            onChangeText={(t) => setDescription(t)}
            value={description}
          />
        </S.InputsArea>

        <S.InputsArea>
          <S.InputTitle>Animal</S.InputTitle>
          <S.PickerArea>
            <Picker
              selectedValue={type}
              borderStyle="solid"
              borderColor="#000"
              style={{height: 50, width: '100%'}}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
              <Picker.Item label="Select a breed" value="" />
              {animalTypes?.map((item, key) => (
                <Picker.Item key={item.id} label={item.name} value={item.id} />
              ))}
            </Picker>
          </S.PickerArea>
        </S.InputsArea>

        <S.InputsArea>
          <S.InputTitle>Breed*</S.InputTitle>
          <S.TextInput
            placeholder="Toy terrier"
            onChangeText={(t) => setBreed(t)}
            value={breed}
          />
        </S.InputsArea>

        <S.InputsArea>
          <S.InputTitle>Alias</S.InputTitle>
          <S.TextInput onChangeText={(t) => setAlias(t)} value={alias} />
        </S.InputsArea>
        <S.InputsArea>
          <S.InputsArea>
            <S.InputTitle>Sex</S.InputTitle>
            <S.PickerArea>
              <Picker
                selectedValue={sex}
                borderStyle="solid"
                borderColor="#000"
                style={{height: 50, width: '100%'}}
                onValueChange={(itemValue, itemIndex) => setSex(itemValue)}>
                <Picker.Item label="Sex" value="" />
                {sexs?.map((item, key) => (
                  <Picker.Item
                    key={item.id}
                    label={item.name}
                    value={item.id}
                  />
                ))}
              </Picker>
            </S.PickerArea>
          </S.InputsArea>
          <S.InputTitle>Age</S.InputTitle>
          <S.TextInput onChangeText={(t) => setAge(t)} value={age} />
        </S.InputsArea>

        <S.InputsArea>
          <S.InputTitle>Price</S.InputTitle>
          <S.TextInput onChangeText={(t) => setPrice(t)} value={price} />
        </S.InputsArea>
      </S.FormArea>

      <View style={{paddingHorizontal: 20}}>
        <Text>Is your pet dignity</Text>
        <CheckBox
          disabled={false}
          value={isDignity}
          onValueChange={(newValue) => setIsDignity(newValue)}
        />
      </View>

      <View style={{paddingHorizontal: 20}}>
        <Text>Would you like to promote this ad?</Text>
        <CheckBox
          disabled={false}
          value={isPaid}
          onValueChange={(newValue) => setIsPaid(newValue)}
        />
      </View>

      <S.ButtonSubmit onPress={handleSubmit}>
        <S.ButtonSubmitText>Submit Advertisement</S.ButtonSubmitText>
      </S.ButtonSubmit>
    </S.Container>
  );
}
