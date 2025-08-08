import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegistrarGlicemia = () => {
  const [glicemia, setGlicemia] = useState("");
  const [data, setData] = useState("");

  const salvarRegistro = async () => {
    if (!glicemia || !data) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    try {
      const novoRegistro = { id: Date.now().toString(), tipo: "glicemia", valor: glicemia, data };
      const registros = JSON.parse(await AsyncStorage.getItem("registros")) || [];
      registros.push(novoRegistro);
      await AsyncStorage.setItem("registros", JSON.stringify(registros));
      Alert.alert("Sucesso", "Glicemia registrada");
      setGlicemia("");
      setData("");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Registrar Glicemia</Text>
      <TextInput
        placeholder="Valor (mg/dL)"
        keyboardType="numeric"
        value={glicemia}
        onChangeText={setGlicemia}
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

export default RegistrarGlicemia;