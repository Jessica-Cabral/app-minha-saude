import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Botao from '../components/Botao';
import Input from '../components/Input';
import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');

  async function validarUsuario() {
    if (!email || !senha) {
      alert("Informe o usuário e a senha");
      return;
    }
    try {
      const usuarioCadastrado = await AsyncStorage.getItem(email);
      const usuario = JSON.parse(usuarioCadastrado);
      if (!usuarioCadastrado) {
        alert("Email não cadastrado!");
        return;
      }
      if (usuario.senha === senha) {
        navigation.navigate("TelaPrincipal");
      } else {
        alert("Senha incorreta");
      }
    } catch (error) {
      alert("Dados inválidos");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.nomeSistema}>Diário Saúde</Text>
      {/* <Text style={styles.subtitulo}>Gerencie sua saúde de forma simples e prática</Text> */}
      <Text style={styles.subtitulo}>Meus índices na sua tela</Text>
      <Input 
        placeholder="Informe seu nome" 
        value={nome} 
        onChangeText={setNome} 
        style={styles.input}
      />
      <Botao 
        titulo="Entrar" 
        onPress={validarUsuario} 
        style={styles.botao}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e6f7ff',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  nomeSistema: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007acc',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  botao: {
    marginTop: 10,
    backgroundColor: '#007acc',
    padding: 10,
    borderRadius: 5,
  },
  link: {
    color: '#007acc',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});