import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  margin: 5%;
  padding: 5%;
  border-radius: 5px;
  overflow: visible;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 1);
  justify-content: space-between;
`;

export const TextContainer = styled.View`
  width: 70%;
  display: flex;
  flex-direction: column;
`;

export const RightContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export const HeadTitle = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 26px;
`;

export const Description = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
`;

export const ClimateDesc = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  color: #f28200;
  margin-top: 7%;
`;
export const DegreeText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 48px;
  color: #f28200;
`;
export const DegreesDesc = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 18px;
  color: #000000;
  margin-top: 5px;
`;

export const ButtonTouchable = styled.TouchableOpacity``;

export const AddButtonText = styled.Text`
  font-family: 'Roboto-Medium';
  color: #0078be;
  font-size: 18px;
  margin-top: 8%;
  margin-left: 5%;
`;

export const DeleteContainer = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e74c3c;
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 5%;
  margin-bottom: 5%;
`;
