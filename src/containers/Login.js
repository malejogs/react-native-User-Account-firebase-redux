import React from "react";
import { Button, Paragraph } from "react-native-paper";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import UserForm from "../components/UserForm";

import { login } from "../state/reducers/actions";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 10px;
`;

const TextInfo = styled(Paragraph)`
  margin-top: 30px;
  text-align: center;
`;

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <UserForm
        isLoginForm
        jsonAnimation={require("../../assets/animations/login.json")}
        buttonText="Log in"
        handleSubmit={(data) => dispatch(login(data))}
      />
      <TextInfo>Need an account?</TextInfo>

      <Button mode="outlined" onPress={() => navigation.navigate("Register")}>
        Sign up now!
      </Button>
    </Container>
  );
};

export default Login;
