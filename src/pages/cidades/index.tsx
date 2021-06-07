import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TouchableOpacity } from 'react-native';
import Card from '../../components/card';
import ConfigButton from '../../components/configbutton';
import Header from '../../components/header';

import {
  Container,
  MessageContainer,
  MessageTitle,
  MessageDescription,
  DeleteButton,
} from './styles';

const CidadesPage: React.FC = () => {
  const [cidades, setCidades] = useState([]);
  const [tempType, setTempType] = useState('Celsius');

  async function deleteCities() {
    await AsyncStorage.removeItem('cidades').then(() => {
      setCidades([]);
    });
  }

  function tempTyper() {
    if (tempType === 'Fahrenheit') {
      setTempType('Celsius');
      return 'Celsius';
    }
    setTempType('Fahrenheit');
    return 'Fahrenheit';
  }

  async function fetchStorage() {
    try {
      const stored = await AsyncStorage.getItem('cidades').then(cid => {
        const c = cid ? JSON.parse(cid) : [];
        setCidades(c);
      });
      if (stored === null) {
        return null;
      }
      return stored;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    fetchStorage();
  }, [cidades]);

  function renderCards() {
    return cidades.map(data => {
      const { cidade, estado, id, isFavorite } = data;

      return (
        <Card
          key={id}
          isAdding={false}
          headerTitle={cidade}
          descText={estado}
          idNumber={id}
          isFavorite={isFavorite}
          isShowingOnCities
          tempType={tempType}
        />
      );
    });
  }

  return (
    <>
      <ConfigButton tempType={tempTyper} />
      <Container>
        <Header title="Cidades" isSearching={false} />
        {cidades.length === 0 ? (
          <MessageContainer>
            <MessageTitle>
              Parece que você ainda não adicionou uma cidade
            </MessageTitle>
            <MessageDescription>
              Tente adicionar uma cidade usando o botão de busca
            </MessageDescription>
          </MessageContainer>
        ) : (
          renderCards()
        )}
        {cidades.length === 0 ? null : (
          <TouchableOpacity onPress={() => deleteCities()}>
            <DeleteButton>Deletar todas</DeleteButton>
          </TouchableOpacity>
        )}
      </Container>
    </>
  );
};

export default CidadesPage;
