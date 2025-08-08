import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Botao from '../components/Botao';
import Input from '../components/Input';
import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Registro from './Registros';
import MeusSintomas from './MeusSintomas';


export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState ('')
  const [senha, setSenha] = useState ('')

  async function validarUsuario() {
    //verifica se o email e a senha foram preenchidos
    if (!email || !senha) {
      alert ("Informe o usuário e a senha")
      return
    }
    try {

      const usuarioCadastrado = await AsyncStorage.getItem(email);
      const usuario = JSON.parse(usuarioCadastrado);
        if (!usuarioCadastrado) {
          alert ("Email não cadastrado!");
          return;
        };
        if (usuario.senha === senha){
          navigation.navigate("TelaPrincipal");
        } else {
          alert ("Senha incorreta");
        } 
    } catch (error) {
        alert ("Dados invalidos");
    }   
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.nomeSistema}>Minha Saúde</Text>
      <Text style={styles.titulo}></Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail}/>
      <Input placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
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
    color: '#9cec',
  },
  link: {
    color: '#9c88ff',
    textAlign: 'center',
    marginTop: 15,
  },
};