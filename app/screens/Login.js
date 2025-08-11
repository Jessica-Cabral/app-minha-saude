import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./Home";

const Login = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [nomeSalvo, setNomeSalvo] = useState("");

  // Carrega o nome salvo ao iniciar
  useEffect(() => {
    const carregarNome = async () => {
      try {
        const nomeArmazenado = await AsyncStorage.getItem("@nome_usuario");
        if (nomeArmazenado) {
          setNomeSalvo(nomeArmazenado);
          setNome(nomeArmazenado);
        }
      } catch (e) {
        Alert.alert("Erro", "Não foi possível carregar o nome");
      }
    };
    carregarNome();
  }, []);

  const salvarNome = async () => {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Digite seu nome");
      return;
    }
    try {
      await AsyncStorage.setItem("@nome_usuario", nome);
      setNomeSalvo(nome);

      navigation.navigate(Home)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", error);
    }
  };

  const navegarComNome = (tela) => {
    if (nomeSalvo) {
      navigation.navigate(tela, { nomeUsuario: nomeSalvo });
    } else {
      Alert.alert("Atenção", "Por favor, salve seu nome primeiro");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Diário MinhaSaúde</Text>
      <Text style={styles.subtitle}>Sua saúde em primeiro lugar! 💙</Text>

      <View style={styles.nomeContainer}>
        <Text style={styles.text}> Informe o seu nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarNome}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0277bd",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
  fontSize: 20,
  color: "#555",
  textAlign: "center",
  marginBottom: 40,
  //fontStyle: "italic",
},
  nomeContainer: {
    marginBottom: 25,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  botaoSalvar: {
    backgroundColor: "#0277bd",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop:10,
    marginBottom:20,
  },
  botaoTexto: {
    color: "white",
    fontWeight: "bold",
  },
  saudacao: {
    marginTop: 10,
    fontSize: 16,
    color: "#0277bd",
    textAlign: "center",
    fontWeight: "500",
  },
  text: {
    fontSize: 18,
    color: "#0277bd",
    fontWeight: "500",
    marginTop:10,
    marginBottom:20,
  },
});

export default Login;
