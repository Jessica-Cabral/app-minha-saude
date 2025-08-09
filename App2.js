import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";

import RegistrarGlicemia from "./app/screens/RegistrarGlicemia";
import RegistrarPressao from "./app/screens/RegistrarPressao";
import MeusRegistros from "./app/screens/MeusRegistros";
import Home from "./app/screens/Home";

const Stack= createStackNavigator();

export default function Navegacao() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MeusRegistros" component={MeusRegistros} />
        <Stack.Screen name="RegistrarGlicemia" component={RegistrarGlicemia} />
        <Stack.Screen name="RegistrarPressao" component={RegistrarPressao} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}