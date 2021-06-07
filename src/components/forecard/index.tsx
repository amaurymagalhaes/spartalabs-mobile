import React, { useEffect, useState } from 'react';
import {
  Container,
  TextContainer,
  HeadTitle,
  Description,
  ClimateDesc,
  DegreeText,
  DegreesDesc,
  RightContainer,
} from './styles';

interface CardProps {
  headerTitle: string;
  descText: string;
  cidadeTempAtual: number;
  cidadeTempMin: number;
  cidadeTempMax: number;
  cidadeClimaText: string;
  tempType: any;
}

const ForeCard: React.FC<CardProps> = props => {
  const {
    headerTitle,
    descText,
    cidadeTempAtual,
    cidadeTempMax,
    cidadeTempMin,
    cidadeClimaText,
    tempType,
  } = props;

  const [tempMinC, setTempMinC] = useState(0);
  const [tempAtualC, setTempAtualC] = useState(0);
  const [tempMaxC, setTempMaxC] = useState(0);
  const [tempMinF, setTempMinF] = useState(0);
  const [tempAtualF, setTempAtualF] = useState(0);
  const [tempMaxF, setTempMaxF] = useState(0);

  function convertToType(temp: number) {
    const convertedTemp = temp * (9 / 5) + 32;
    const roundedTemp = Math.round(convertedTemp);
    return roundedTemp;
  }

  function fetchTemps() {
    setTempMinC(cidadeTempMin);
    setTempMaxC(cidadeTempMax);
    setTempAtualC(cidadeTempAtual);
    setTempMinF(convertToType(cidadeTempMin));
    setTempMaxF(convertToType(cidadeTempMax));
    setTempAtualF(convertToType(cidadeTempAtual));
  }

  useEffect(() => {
    fetchTemps();
  }, [cidadeTempMin, cidadeTempMax, cidadeTempAtual]);

  return (
    <Container
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
        <ClimateDesc>{cidadeClimaText}</ClimateDesc>
        <DegreesDesc>
          {tempType === 'Celsius'
            ? `${tempMinC}º - ${tempMaxC}º`
            : `${tempMinF} F - ${tempMaxF} F`}
        </DegreesDesc>
      </TextContainer>
      <RightContainer>
        <DegreeText>
          {tempType === 'Celsius' ? `${tempAtualC}º` : `${tempAtualF} F`}
        </DegreeText>
      </RightContainer>
    </Container>
  );
};

export default ForeCard;
