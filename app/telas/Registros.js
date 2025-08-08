import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Botao from "../components/Botao";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import Login from "./Home";

export default function Registro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  //função cadastrarUsuario
  async function registrarUsuario() {
    
    if (senha === confirmarSenha) {
      try {
        const chave = email;
        const usuario = JSON.stringify({ nome, senha });
        const usuarioExistente = await AsyncStorage.getItem(email);
      
        if (usuarioExistente) {
        alert("Email já cadastrado!");
        }
        await AsyncStorage.setItem(chave, usuario);
        alert("Usuário cadastrado com sucesso");
        navigation.navigate("TelaLogin");
      } catch (error) {
        alert("Erro ao cadastrar usuário!");
      }
    } else {
      alert("Senhas divergentes!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro</Text>
      <Input placeholder="Nome Completo" value={nome} onChangeText={setNome} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Input
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />
      <Botao titulo="Criar Conta" onPress={registrarUsuario} />
      <TouchableOpacity onPress={() => navigation.navigate("TelaLogin")}>
        <Text style={styles.link}>Já tem conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#9c88ff",
  },
  link: {
    color: "#9c88ff",
    textAlign: "center",
    marginTop: 15,
  },
};
