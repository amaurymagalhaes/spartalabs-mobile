import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/core';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Api from '../../services/api';
import {
  Container,
  TextContainer,
  HeadTitle,
  Description,
  AddButtonText,
  ButtonTouchable,
  ClimateDesc,
  DegreeText,
  DegreesDesc,
  RightContainer,
  DeleteContainer,
} from './styles';

interface CardProps {
  isAdding: boolean;
  isShowingOnCities?: boolean;
  headerTitle: string;
  descText: string;
  idNumber?: number;
  isFavorite: boolean;
  tempType?: any;
}

const Card: React.FC<CardProps> = props => {
  const {
    idNumber,
    isFavorite,
    isAdding,
    isShowingOnCities,
    headerTitle,
    descText,
    tempType,
  } = props;

  const [climaText, setClimaText] = useState('');
  const [tempMinC, setTempMinC] = useState(0);
  const [tempAtualC, setTempAtualC] = useState(0);
  const [tempMaxC, setTempMaxC] = useState(0);
  const [tempMinF, setTempMinF] = useState(0);
  const [tempAtualF, setTempAtualF] = useState(0);
  const [tempMaxF, setTempMaxF] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(isFavorite);
  }, [isFavorite]);

  const screenWidth = Dimensions.get('window').width;

  const navigation = useNavigation();

  function convertToType(temp: number) {
    const convertedTemp = temp * (9 / 5) + 32;
    const roundedTemp = Math.round(convertedTemp);
    return roundedTemp;
  }

  async function saveOnStorage() {
    await AsyncStorage.getItem('cidades').then(cid => {
      const c = cid ? JSON.parse(cid) : [];
      const id = c.length + 1;

      c.push({
        id,
        cidade: headerTitle,
        estado: descText,
        isFavorite: false,
      });
      AsyncStorage.setItem('cidades', JSON.stringify(c));
      navigation.goBack();
    });
  }

  async function fetchData() {
    await Api.get(
      `/weather?q=${headerTitle},${descText}&lang=pt_br&units=metric&APPID=ddd959480a20878a9364e96b8eae10e9`,
    ).then(d => {
      setClimaText(d.data.weather[0].description);
      setTempMinC(Math.round(d.data.main.temp_min));
      setTempMaxC(Math.round(d.data.main.temp_max));
      setTempAtualC(Math.round(d.data.main.temp));
      setTempMinF(convertToType(Math.round(d.data.main.temp_min)));
      setTempMaxF(convertToType(Math.round(d.data.main.temp_max)));
      setTempAtualF(convertToType(Math.round(d.data.main.temp)));
    });
  }

  useEffect(() => {
    fetchData();
  }, [headerTitle, descText, idNumber]);

  async function switchFavorite() {
    if (isFavorite === true) {
      setIsFavorited(false);
      await AsyncStorage.getItem('cidades').then(cid => {
        const c = cid ? JSON.parse(cid) : [];
        const newArray = c.filter((e: any) => {
          return e.id !== idNumber;
        });
        newArray.push({
          id: idNumber,
          cidade: headerTitle,
          estado: descText,
          isFavorite: false,
        });
        AsyncStorage.setItem('cidades', JSON.stringify(newArray));
      });
    } else {
      setIsFavorited(true);
      await AsyncStorage.getItem('cidades').then(cid => {
        const c = cid ? JSON.parse(cid) : [];
        const newArray = c.filter((e: any) => {
          return e.id !== idNumber;
        });
        newArray.unshift({
          id: idNumber,
          cidade: headerTitle,
          estado: descText,
          isFavorite: true,
        });
        AsyncStorage.setItem('cidades', JSON.stringify(newArray));
      });
    }
  }

  async function deleteCard() {
    await AsyncStorage.getItem('cidades').then(cid => {
      const c = cid ? JSON.parse(cid) : [];
      const newArray = c.filter((e: any) => {
        return e.id !== idNumber;
      });
      AsyncStorage.setItem('cidades', JSON.stringify(newArray));
    });
  }

  function deleteActionScreen() {
    return (
      <DeleteContainer onPress={() => deleteCard()}>
        <Icon name="trash" size={screenWidth / 10} color="#ffffff" />
      </DeleteContainer>
    );
  }

  return (
    <Swipeable
      renderLeftActions={() => {
        return deleteActionScreen();
      }}
    >
      <Container
        onPress={() =>
          navigation.navigate('Previsoes', {
            headerTitle,
            descText,
          })
        }
        style={{
          shadowColor: '#000000',
          shadowOffset: {
            width: 10,
            height: 5,
          },
          shadowOpacity: 0.5,
          elevation: 5,
        }}
      >
        <TextContainer>
          <HeadTitle>{headerTitle}</HeadTitle>
          <Description>{descText}</Description>
          {isAdding === false ? (
            <>
              <ClimateDesc>{climaText}</ClimateDesc>
              <DegreesDesc>
                {tempType === 'Celsius'
                  ? `${tempMinC}º - ${tempMaxC}º`
                  : `${tempMinF} F - ${tempMaxF} F`}
              </DegreesDesc>
            </>
          ) : null}
          {isAdding === true ? (
            <ButtonTouchable>
              <AddButtonText
                onPress={() => {
                  saveOnStorage();
                }}
              >
                ADICIONAR
              </AddButtonText>
            </ButtonTouchable>
          ) : null}
        </TextContainer>
        {isAdding === false ? (
          <RightContainer>
            <DegreeText>
              {tempType === 'Celsius' ? `${tempAtualC}º` : `${tempAtualF} F`}
            </DegreeText>
            {isShowingOnCities === true ? (
              <ButtonTouchable onPress={() => switchFavorite()}>
                {isFavorited === true ? (
                  <Icon name="heart" size={screenWidth / 10} color="#ed0952" />
                ) : (
                  <Icon name="heart" size={screenWidth / 10} color="#c7c7c7" />
                )}
              </ButtonTouchable>
            ) : null}
          </RightContainer>
        ) : null}
      </Container>
    </Swipeable>
  );
};

export default Card;
