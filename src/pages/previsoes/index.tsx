import React, { useEffect, useState } from 'react';

import moment from 'moment';
import ForeCard from '../../components/forecard';

import ConfigButton from '../../components/configbutton';

import Api from '../../services/api';
import 'moment/locale/pt-br';

import Header from '../../components/header';

import { Container, ForecastTitle } from './styles';

interface PrevInterface {
  route?: any;
}

const PrevisoesPage: React.FC<PrevInterface> = props => {
  const { route } = props;
  const { params } = route;
  const [tempType, setTempType] = useState('Celsius');
  const [cidade, setCidade] = useState({ cidadeNome: '', estadoNome: '' });
  const [todayForecast, setTodayForecast] = useState<any[]>([]);
  const [nextForecast, setNextForecast] = useState<any[]>([]);

  function tempTyper() {
    if (tempType === 'Fahrenheit') {
      setTempType('Celsius');
      return 'Celsius';
    }
    setTempType('Fahrenheit');
    return 'Fahrenheit';
  }

  async function fetchDataNext(cidadeNome: string, estadoNome: string) {
    await Api.get(
      `/forecast?q=${cidadeNome},${estadoNome}&lang=pt_br&units=metric&APPID=ddd959480a20878a9364e96b8eae10e9`,
    )
      .then(d => {
        const { list } = d.data;
        const arrayForecast = [] as any;
        arrayForecast.push(list[7], list[15], list[23], list[31]);
        setNextForecast(arrayForecast);
      })
      .catch();
  }

  async function fetchDataFirst(cidadeNome: string, estadoNome: string) {
    await Api.get(
      `/weather?q=${cidadeNome},${estadoNome}&lang=pt_br&units=metric&APPID=ddd959480a20878a9364e96b8eae10e9`,
    )
      .then(d => {
        const { data } = d;
        const arrayWeather = [] as any;
        arrayWeather.unshift(data);
        setTodayForecast(arrayWeather);
      })
      .catch();
  }

  useEffect(() => {
    setCidade({
      cidadeNome: params.headerTitle,
      estadoNome: params.descText,
    });
    fetchDataFirst(params.headerTitle, params.descText);
    fetchDataNext(params.headerTitle, params.descText);
  }, [params.headerTitle, params.descText]);

  function getTime(date: any) {
    moment.locale('pt-br');
    const dayFormated = moment(date).format('D');
    const monthFormated = moment(date).format('MMMM');
    const dateFormated = `${dayFormated} de ${monthFormated}`;
    return dateFormated;
  }

  function getDay(date: any) {
    moment.locale('pt-br');
    const day = moment(date).format('dddd');
    const dayFormated = day.charAt(0).toUpperCase() + day.slice(1);
    return dayFormated;
  }

  function renderCardFirst() {
    if (todayForecast.length > 0) {
      return (
        <ForeCard
          headerTitle="Hoje"
          descText={getTime(moment())}
          cidadeTempAtual={Math.round(todayForecast[0].main.temp)}
          cidadeClimaText={todayForecast[0].weather[0].description}
          cidadeTempMin={Math.round(todayForecast[0].main.temp_min)}
          cidadeTempMax={Math.round(todayForecast[0].main.temp_max)}
          tempType={tempType}
        />
      );
    }
    return null;
  }

  function renderCardNext() {
    if (nextForecast.length > 3) {
      return (
        <>
          <ForeCard
            headerTitle="Amanhã"
            descText={getTime(nextForecast[0].dt_txt)}
            cidadeTempAtual={Math.round(nextForecast[0].main.temp)}
            cidadeClimaText={nextForecast[0].weather[0].description}
            cidadeTempMin={Math.round(nextForecast[0].main.temp_min)}
            cidadeTempMax={Math.round(nextForecast[0].main.temp_max)}
            tempType={tempType}
          />
          <ForeCard
            headerTitle={getDay(nextForecast[1].dt_txt)}
            descText={getTime(nextForecast[1].dt_txt)}
            cidadeTempAtual={Math.round(nextForecast[1].main.temp)}
            cidadeClimaText={nextForecast[0].weather[0].description}
            cidadeTempMin={Math.round(nextForecast[1].main.temp_min)}
            cidadeTempMax={Math.round(nextForecast[1].main.temp_max)}
            tempType={tempType}
          />
          <ForeCard
            headerTitle={getDay(nextForecast[2].dt_txt)}
            descText={getTime(nextForecast[2].dt_txt)}
            cidadeTempAtual={Math.round(nextForecast[2].main.temp)}
            cidadeClimaText={nextForecast[2].weather[0].description}
            cidadeTempMin={Math.round(nextForecast[2].main.temp_min)}
            cidadeTempMax={Math.round(nextForecast[2].main.temp_max)}
            tempType={tempType}
          />
          <ForeCard
            headerTitle={getDay(nextForecast[3].dt_txt)}
            descText={getTime(nextForecast[3].dt_txt)}
            cidadeTempAtual={Math.round(nextForecast[3].main.temp)}
            cidadeClimaText={nextForecast[3].weather[0].description}
            cidadeTempMin={Math.round(nextForecast[3].main.temp_min)}
            cidadeTempMax={Math.round(nextForecast[3].main.temp_max)}
            tempType={tempType}
          />
        </>
      );
    }
    return null;
  }

  return (
    <>
      <Container>
        <Header title={cidade.cidadeNome} isShowingForecast />
        <ForecastTitle>Previsão para os próximos 5 dias</ForecastTitle>
        {renderCardFirst()}
        {renderCardNext()}
      </Container>
      <ConfigButton tempType={tempTyper} />
    </>
  );
};

export default PrevisoesPage;
