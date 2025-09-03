import React, { useState, useEffect } from "react";
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

const Home = ({ route, navigation }) => {
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
      <Text style={styles.saudacao}>
        {nomeSalvo
          ? `Olá, ${nomeSalvo}! `
          : ""}
      </Text>
      <Text style={styles.subtitle}>Cada registro é um passo para seu bem-estar!</Text>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navegarComNome("RegistrarSaude")}
      >
        <Ionicons name="add-circle" size={30} color="#0277bd" />
        <Text style={styles.cardText}>Novo Registro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navegarComNome("MeusRegistros")}
      >
        <Ionicons name="list" size={30} color="#0277bd" />
        <Text style={styles.cardText}>Meus Registros</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navegarComNome("Comparativo")}
      >
        <Ionicons name="stats-chart" size={30} color="#0277bd" />
        <Text style={styles.cardText}>Comparativo</Text>
      </TouchableOpacity>
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
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
    //fontStyle: "italic",
  },
  saudacao: {
    marginTop: 10,
    marginBottom:20,
    fontSize: 25,
    color: "#0277bd",
    textAlign: "center",
    fontWeight: "500",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardText: {
    marginLeft: 15,
    fontSize: 18,
    color: "#0277bd",
    fontWeight: "500",
  },
});

export default Home;
