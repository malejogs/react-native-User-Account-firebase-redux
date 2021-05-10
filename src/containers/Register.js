import React from "react";
import { View } from "react-native";
import { Button, Paragraph } from "react-native-paper";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { register } from "../state/reducers/actions";
import UserForm from "../components/UserForm";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px;
`;

const TextInfo = styled(Paragraph)`
  margin-top: 30px;
  text-align: center;
`;

const Register = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <UserForm
        jsonAnimation={require("../../assets/animations/data.json")}
        buttonText="Sign up"
        handleSubmit={(data) => dispatch(register(data))}
      />
      <TextInfo>Already have an account?</TextInfo>

      <Button mode="outlined" onPress={() => navigate("Login")}>
        Log in
      </Button>
    </Container>
  );
};

export default Register;
