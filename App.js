import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';

import Login from './app/screens/Login';
import Home from './app/screens/Home';
import RegistrarSaude from './app/screens/RegistrarSaude';
import MeusRegistros from './app/screens/MeusRegistros';


const Stack = createStackNavigator();

// Componente de cabeçalho personalizado
const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Diário MinhaSaúde</Text>
      <View style={{ width: 24 }} /> {/* Espaço para alinhamento */}
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({ navigation }) => <CustomHeader navigation={navigation} />,
          headerStyle: {
            backgroundColor: '#81d4fa',
          },
          cardStyle: {
            backgroundColor: '#f0f4f8'
          }
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="RegistrarSaude" 
          component={RegistrarSaude} 
          options={{ title: 'Registrar Saúde' }} 
        />
        <Stack.Screen 
          name="MeusRegistros" 
          component={MeusRegistros} 
          options={{ title: 'Meus Registros' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#81d4fa',
    height: 60,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});