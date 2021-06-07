import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
// import { Container } from './styles';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#00aaf2" barStyle="light-content" />
      <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};

export default App;
