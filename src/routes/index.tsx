import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CidadesPage from '../pages/cidades';
import BuscaPage from '../pages/busca';
import PrevisoesPage from '../pages/previsoes';

const RoutesNavigator = createStackNavigator();

const Routes: React.FC = () => (
  <RoutesNavigator.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <RoutesNavigator.Screen name="Cidades" component={CidadesPage} />
    <RoutesNavigator.Screen name="Previsoes" component={PrevisoesPage} />
    <RoutesNavigator.Screen name="Busca" component={BuscaPage} />
  </RoutesNavigator.Navigator>
);

export default Routes;
