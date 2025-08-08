import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Botao from '../components/Botao';
import Input from '../components/Input';
import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Home() {
  const navigation = useNavigation();



  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.nomeSistema}>Minha Saúde</Text>
      <Text style={styles.titulo}></Text>
      
      <Botao 
        titulo="Entrar" 
        onPress={validarUsuario} 
      />
      <TouchableOpacity onPress={() => navigation.navigate('TelaRegistro')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 10,
  },
  nomeSistema: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#9c88ff',
  },
  link: {
    color: '#9c88ff',
    textAlign: 'center',
    marginTop: 15,
  },
};