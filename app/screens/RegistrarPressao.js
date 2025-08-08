import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegistrarPressao = () => {
  const [pressaoSys, setPressaoSys] = useState("");
  const [pressaoDia, setPressaoDia] = useState("");
  const [data, setData] = useState("");

  const salvarRegistro = async () => {
    if (!pressaoSys || !pressaoDia || !data) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    try {
      const novoRegistro = { id: Date.now().toString(), tipo: "pressao", valor: `${pressaoSys}/${pressaoDia}`, data };
      const registros = JSON.parse(await AsyncStorage.getItem("registros")) || [];
      registros.push(novoRegistro);
      await AsyncStorage.setItem("registros", JSON.stringify(registros));
      Alert.alert("Sucesso", "Pressão registrada");
      setPressaoSys("");
      setPressaoDia("");
      setData("");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Registrar Pressão</Text>
      <TextInput
        placeholder="Pressão Sistólica"
        keyboardType="numeric"
        value={pressaoSys}
        onChangeText={setPressaoSys}
        style={styles.input}
      />
      <TextInput
        placeholder="Pressão Diastólica"
        keyboardType="numeric"
        value={pressaoDia}
        onChangeText={setPressaoDia}
        style={styles.input}
      />
      <TextInput
        placeholder="Data (ex: 2025-08-08)"
        value={data}
        onChangeText={setData}
        style={styles.input}
      />
      <Button title="Salvar" onPress={salvarRegistro} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f4f8" },
  label: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#0277bd" },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default RegistrarPressao;