import React from "react";
import LottieView from "lottie-react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <Container>
      <LottieView
        source={require("../../assets/animations/loading.json")}
        autoPlay
        loop
      />
    </Container>
  );
};

export default Loading;
