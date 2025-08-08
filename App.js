import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";

import RegistrarGlicemia from "./screens/RegistrarGlicemia";
import RegistrarPressao from "./screens/RegistrarPressao";
import MeusRegistros from "./screens/MeusRegistros";

const Drawer = createDrawerNavigator();

// Estilização das páginas
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#b3e5fc', flex: 1 }}>
      <View style={styles.drawerHeader}>
        <Ionicons name="heart" size={40} color="#ffffff" />
        <Text style={styles.drawerHeaderText}>Minha Saúde</Text>
        <Text style={styles.drawerHeaderSubText}>Cuidando de você</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: '#81d4fa' },
          headerTintColor: 'white',
          drawerActiveBackgroundColor: '#81d4fa',
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: { fontWeight: 'bold', fontSize: 16 },
        }}
      >
        <Drawer.Screen
          name="Meus Registros"
          component={MeusRegistros}
          options={{
            drawerIcon: ({ color }) => <Ionicons name="list" size={22} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Registrar Glicemia"
          component={RegistrarGlicemia}
          options={{
            drawerIcon: ({ color }) => <Ionicons name="water" size={22} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Registrar Pressão"
          component={RegistrarPressao}
          options={{
            drawerIcon: ({ color }) => <Ionicons name="heart" size={22} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: "#4fc3f7",
    marginBottom: 10,
    alignItems: "center",
  },
  drawerHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
  },
  drawerHeaderSubText: {
    fontSize: 14,
    color: "#e1f5fe",
  },
});