import React from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Container from './styles';

interface ConfigButtonProps {
  tempType: any;
}

const ConfigButton: React.FC<ConfigButtonProps> = props => {
  const { tempType } = props;
  const screenWidth = Dimensions.get('window').width;
  return (
    <Container onPress={tempType}>
      <Icon name="thermometer" size={screenWidth / 8} color="#FFFFFF" />
    </Container>
  );
};

export default ConfigButton;
