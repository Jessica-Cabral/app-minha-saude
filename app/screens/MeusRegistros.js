import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const MeusRegistros = ({ route, navigation }) => {
  const [registros, setRegistros] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const nomeUsuario = route.params?.nomeUsuario || "";

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      carregarRegistros();
    });
    return unsubscribe;
  }, [navigation]);

  const carregarRegistros = async () => {
    try {
      const data = await AsyncStorage.getItem("registros");
      if (data) {
        const registrosOrdenados = JSON.parse(data).sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setRegistros(registrosOrdenados);
      } else {
        setRegistros([]);
      }
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar os registros");
    }
  };

  const excluirRegistro = async (id) => {
    try {
      const novosRegistros = registros.filter((registro) => registro.id !== id);
      await AsyncStorage.setItem("registros", JSON.stringify(novosRegistros));
      setRegistros(novosRegistros);
      Alert.alert("Sucesso", "Registro excluído com sucesso");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível excluir o registro");
    }
  };

  const confirmarExclusao = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Deseja realmente excluir este registro?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => excluirRegistro(id),
        },
      ]
    );
  };

  // Filtra os registros conforme o texto de pesquisa
  const registrosFiltrados = registros.filter((item) => {
    const texto = pesquisa.toLowerCase();
    return (
      item.tipo.toLowerCase().includes(texto) ||
      item.valor.toString().toLowerCase().includes(texto) ||
      (item.data && item.data.toLowerCase().includes(texto))
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {nomeUsuario ? `Meus Registros - ${nomeUsuario}` : "Meus Registros"}
      </Text>

      <TextInput
        style={styles.inputPesquisa}
        placeholder="Pesquisar registros..."
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      {registrosFiltrados.length === 0 ? (
        <View style={styles.listaVazia}>
          <Ionicons name="document-text-outline" size={50} color="#0277bd" />
          <Text style={styles.textoListaVazia}>Nenhum registro encontrado</Text>
        </View>
      ) : (
        <FlatList
          data={registrosFiltrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <View style={styles.registroItem}>
              <View style={styles.registroCabecalho}>
                <Text style={styles.registroTipo}>
                  {item.tipo.toUpperCase()}
                </Text>
                <TouchableOpacity
                  onPress={() => confirmarExclusao(item.id)}
                  style={styles.botaoExcluir}
                >
                  <Ionicons name="trash-outline" size={20} color="#e53935" />
                </TouchableOpacity>
              </View>

              <Text style={styles.registroTexto}>
                <Text style={styles.registroLabel}>Valor: {item.valor} </Text>
              </Text>

              <Text style={styles.registroTexto}>
                <Text style={styles.registroLabel}>Data:{item.data} </Text>
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#0277bd",
    textAlign: "center",
  },
  inputPesquisa: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#b3c6cf",
    fontSize: 16,
  },
  lista: {
    paddingBottom: 20,
  },
  registroItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#0277bd",
  },
  registroCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  registroTipo: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#01579b",
  },
  registroTexto: {
    marginVertical: 3,
    fontSize: 14,
  },
  registroLabel: {
    fontWeight: "500",
    color: "#555",
  },
  botaoExcluir: {
    padding: 5,
  },
  listaVazia: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  textoListaVazia: {
    marginTop: 15,
    fontSize: 16,
    color: "#555",
  },
});

export default MeusRegistros;
