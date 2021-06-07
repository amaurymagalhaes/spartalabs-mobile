import React, { useState } from 'react';
import Header from '../../components/header';

import Card from '../../components/card';

import { Container } from './styles';

const BuscaPage: React.FC = () => {
  const [headerTitle, setHeaderTitle] = useState('');
  const [descText, setDescText] = useState('');

  function searchingData(e: any) {
    setHeaderTitle(e.cidade);
    setDescText(e.estado);
  }

  return (
    <Container>
      <Header title="Cidades" isSearching searchData={searchingData} />
      {headerTitle.length === 0 || descText.length === 0 ? null : (
        <Card
          isFavorite={false}
          isAdding
          headerTitle={headerTitle}
          descText={descText}
        />
      )}
    </Container>
  );
};

export default BuscaPage;
