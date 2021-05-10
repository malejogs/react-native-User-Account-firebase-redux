import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import Login from "./containers/Login";
import Register from "./containers/Register";
import Profile from "./containers/Profile";
import Loading from "./containers/Loading";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { data, loading, error } = useSelector(
    ({ userReducer }) => userReducer
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {data?.email ? (
          <>
            <Stack.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
