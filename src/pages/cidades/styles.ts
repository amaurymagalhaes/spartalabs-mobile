import styled from 'styled-components/native';

export const Container = styled.ScrollView``;

export const MessageContainer = styled.View`
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 20%;
`;

export const MessageTitle = styled.Text`
  color: #000000;
  font-family: 'Roboto-Medium';
  font-size: 22px;
  text-align: center;
  margin-bottom: 10px;
`;

export const MessageDescription = styled.Text`
  color: gray;
  font-family: 'Roboto-Regular';
  font-size: 18px;
  text-align: center;
`;

export const DeleteButton = styled.Text`
  color: blue;
  font-family: 'Roboto-Regular';
  font-size: 18px;
  text-align: center;
  margin: 10px;
`;
