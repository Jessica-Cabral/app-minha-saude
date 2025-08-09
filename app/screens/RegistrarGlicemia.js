import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegistrarGlicemia = () => {
  const [glicemia, setGlicemia] = useState("");
  const [data, setData] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [registros, setRegistros] = useState([]);

  // Carregar registros salvos
  useEffect(() => {
    carregarRegistros();
  }, []);

  const carregarRegistros = async () => {
    try {
      const data = await AsyncStorage.getItem("registros");
      if (data) setRegistros(JSON.parse(data));
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar os registros");
    }
  };

  // Salvar novo registro
  const salvarRegistro = async () => {
    if (!glicemia) {
      Alert.alert("Erro", "Preencha o valor da glicemia");
      return;
    }
    try {
      const novoRegistro = { 
        id: Date.now().toString(), 
        tipo: "glicemia", 
        valor: glicemia, 
        data: data.toLocaleDateString("pt-BR") 
      };
      const registrosAtualizados = [...registros, novoRegistro];
      await AsyncStorage.setItem("registros", JSON.stringify(registrosAtualizados));
      setRegistros(registrosAtualizados);
      Alert.alert("Sucesso", "Glicemia registrada");
      setGlicemia("");
    } catch (e) {
      Alert.alert("Erro", "Não foi possível salvar");
    }
  };

  // Excluir registro
  const excluirRegistro = async (id) => {
    const registrosAtualizados = registros.filter(item => item.id !== id);
    await AsyncStorage.setItem("registros", JSON.stringify(registrosAtualizados));
    setRegistros(registrosAtualizados);
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

      <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.dateButtonText}>
          {data ? data.toLocaleDateString("pt-BR") : "Selecionar Data"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="calendar"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setData(selectedDate);
          }}
        />
      )}

      <Button title="Salvar" onPress={salvarRegistro} />

      <Text style={[styles.label, { marginTop: 20 }]}>Registros Salvos</Text>
      <FlatList
        data={registros.filter(r => r.tipo === "glicemia")}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.registroItem}>
            <Text style={{ fontWeight: "bold" }}>Valor: {item.valor}</Text>
            <Text>Data: {item.data}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => excluirRegistro(item.id)}
            >
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
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
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dateButton: {
    backgroundColor: "#81d4fa",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    alignItems: "center",
  },
  dateButtonText: { color: "#fff", fontWeight: "bold" },
  registroItem: {
    backgroundColor: "#bbdefb",
    padding: 15,
    marginVertical: 6,
    borderRadius: 8,
  },
  deleteButton: {
    flexDirection: "row",
    backgroundColor: "#e57373",
    padding: 6,
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
  },
  deleteText: { color: "#fff", fontWeight: "bold" },
});

export default RegistrarGlicemia;
