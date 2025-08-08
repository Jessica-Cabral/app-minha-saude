import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MeusRegistros = ({ navigation }) => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      carregarRegistros();
    });
    return unsubscribe;
  }, [navigation]);

  const carregarRegistros = async () => {
    try {
      const data = await AsyncStorage.getItem("registros");
      if (data) setRegistros(JSON.parse(data));
      else setRegistros([]);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar os registros");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Meus Registros</Text>
      <FlatList
        data={registros}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.registroItem}>
            <Text style={{ fontWeight: "bold" }}>{item.tipo.toUpperCase()}</Text>
            <Text>Valor: {item.valor}</Text>
            <Text>Data: {item.data}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Nenhum registro encontrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f4f8" },
  label: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#0277bd" },
  registroItem: {
    backgroundColor: "#bbdefb",
    padding: 15,
    marginVertical: 6,
    borderRadius: 8,
  },
});

export default MeusRegistros;