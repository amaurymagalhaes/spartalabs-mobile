import styled from 'styled-components/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface ContainerProps {
  isSearching: boolean;
}

export const Container = styled.View<ContainerProps>`
  display: flex;
  flex-direction: row;
  background-color: #00aaf2;
  width: 100%;
  padding: 20px;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  justify-content: ${props =>
    props.isSearching === false ? 'space-between' : 'flex-start'};
`;

export const PageTitle = styled.Text`
  color: #ffffff;
  margin-left: 5%;
  font-size: 24px;
  font-family: 'Roboto-Regular';
`;

export const InputTitle = styled(GooglePlacesAutocomplete)`
  color: #ffffff;
  margin-left: 5%;
  font-size: 22px;
  font-family: 'Roboto-Light';
`;

export const TouchableIcon = styled.TouchableOpacity``;
