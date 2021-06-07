import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { Container, InputTitle, PageTitle, TouchableIcon } from './styles';

interface HeaderProps {
  title: string;
  isShowingForecast?: boolean;
  isSearching?: boolean;
  searchData?: any;
}

const Header: React.FC<HeaderProps> = props => {
  const { title, isSearching, searchData, isShowingForecast } = props;
  const [isSearchingState, setIsSearching] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  const keyboardDidShow = () => setIsTyping(true);
  const keyboardDidHide = () => setIsTyping(false);

  useEffect(() => {
    setIsSearching(isSearching as boolean);
  }, [isSearching]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  const navigation = useNavigation();

  return (
    <Container isSearching={isSearchingState}>
      {isSearchingState === true && isTyping === false ? (
        <TouchableIcon
          onPress={() => {
            navigation.navigate('Cidades');
          }}
        >
          <Icon name="x" size={screenWidth / 15} color="#FFFFFF" />
        </TouchableIcon>
      ) : null}
      {isShowingForecast === true ? (
        <TouchableIcon
          onPress={() => {
            navigation.navigate('Cidades');
          }}
        >
          <Icon name="chevron-left" size={screenWidth / 15} color="#FFFFFF" />
        </TouchableIcon>
      ) : null}
      {isSearchingState === false || isShowingForecast === true ? (
        <PageTitle>{title}</PageTitle>
      ) : (
        <InputTitle
          placeholder="Procure por uma cidade..."
          onPress={data => {
            searchData({
              cidade: data.structured_formatting.main_text,
              estado: data.structured_formatting.secondary_text,
            });
            console.log(data);
          }}
          textInputProps={{
            placeholderTextColor: '#FFFFFF',
            style: {
              color: '#FFFFFF',
              marginLeft: '5%',
              fontSize: 22,
              fontFamily: 'Roboto-Light',
            },
          }}
          query={{
            key: 'AIzaSyCWb5gY_-aXZ9aafI_Ymw0cSKDam8M66Uo',
            language: 'pt-br',
            types: '(cities)',
          }}
        />
      )}

      {isSearchingState === false ? (
        <TouchableIcon
          onPress={() => {
            navigation.navigate('Busca');
          }}
        >
          <Icon name="search" size={screenWidth / 15} color="#FFFFFF" />
        </TouchableIcon>
      ) : null}
    </Container>
  );
};

export default Header;
