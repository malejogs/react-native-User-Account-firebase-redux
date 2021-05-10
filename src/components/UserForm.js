import React from "react";
import { Text, View } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import LottieView from "lottie-react-native";
import styled from "styled-components";

const ContainerLottie = styled.View`
  height: 320px;
  justify-content: center;
`;

const Btn = styled(Button)`
  margin: 5px 0;
`;

const UserForm = ({
  jsonAnimation,
  buttonText,
  handleSubmit: formSubmit,
  isLoginForm = false,
  isEUpdateForm = false,
  initialValues = { email: "", password: "", names: "" },
  readonly = false,
  onReset,
}) => (
  <>
    {jsonAnimation && (
      <ContainerLottie>
        <LottieView source={jsonAnimation} autoPlay loop />
      </ContainerLottie>
    )}
    <Formik
      initialValues={initialValues}
      validationSchema={
        !isEUpdateForm &&
        yup.object().shape({
          name: !isLoginForm && yup.string().required(),
          email: yup.string().email().required(),
          password: yup.string().min(6).required(),
        })
      }
      onSubmit={(values) => formSubmit(values)}
      validateOnChange={false}
    >
      {({ values, errors, handleChange, handleSubmit, handleReset }) => (
        <View>
          {!isLoginForm && (
            <>
              <TextInput
                value={values.name}
                onChangeText={handleChange("name")}
                label="Name"
                error={!!errors.name}
                disabled={readonly}
              />
              {!readonly && (
                <HelperText type="error" visible={!!errors.name}>
                  {errors.name}
                </HelperText>
              )}
            </>
          )}

          <TextInput
            value={values.email}
            onChangeText={handleChange("email")}
            label="E-mail"
            error={!!errors.email}
            disabled={readonly}
          />
          {!readonly && (
            <HelperText type="error" visible={!!errors.email}>
              {errors.email}
            </HelperText>
          )}
          {!readonly && (
            <TextInput
              value={values.password}
              onChangeText={handleChange("password")}
              label={`${isEUpdateForm ? "New" : ""} Password`}
              secureTextEntry={true}
              error={!!errors.password}
              disabled={readonly}
            />
          )}
          {!readonly && (
            <HelperText type="error" visible={!!errors.password}>
              {errors.password}
            </HelperText>
          )}
          {!readonly && (
            <Btn mode="contained" onPress={handleSubmit}>
              {buttonText}
            </Btn>
          )}
          {!readonly && onReset && (
            <Btn
              mode="outlined"
              onPress={() => {
                handleReset();
                onReset();
              }}
            >
              Cancel
            </Btn>
          )}
        </View>
      )}
    </Formik>
  </>
);

export default UserForm;
