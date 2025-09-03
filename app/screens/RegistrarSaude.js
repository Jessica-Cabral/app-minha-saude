import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegistrarSaude = ({ route }) => {
  const nomeUsuario = route.params?.nomeUsuario || "";
  const [tipoRegistro, setTipoRegistro] = useState("glicemia");
  const [valor, setValor] = useState("");
  const [valorSecundario, setValorSecundario] = useState("");
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState("date");

  const handleSalvar = async () => {
    if (!validarCampos()) return;

    try {
      const registro = criarRegistro();
      const registros =
        JSON.parse(await AsyncStorage.getItem("registros")) || [];
      registros.unshift(registro);
      await AsyncStorage.setItem("registros", JSON.stringify(registros));
      limparCampos();
      Alert.alert("Sucesso!", "Registro salvo com sucesso");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar registro");
    }
  };

  const validarCampos = () => {
    if (!valor) {
      Alert.alert(
        "Atenção",
        `Informe o valor do ${
          tipoRegistro === "glicemia"
            ? "glicemia"
            : tipoRegistro === "pressao"
            ? "pressão sistólica"
            : "batimento cardíaco"
        }`
      );
      return false;
    }

    if (tipoRegistro === "pressao" && !valorSecundario) {
      Alert.alert("Atenção", "Informe o valor da pressão diastólica");
      return false;
    }

    if (
      isNaN(valor) ||
      (tipoRegistro === "pressao" && isNaN(valorSecundario))
    ) {
      Alert.alert("Atenção", "Valores devem ser numéricos");
      return false;
    }

    return true;
  };

  const criarRegistro = () => {
    const registro = {
      id: Date.now().toString(),
      tipo: tipoRegistro,
      data:
        data.toISOString().split("T")[0] +
        " " +
        data.toTimeString().substring(0, 5),
      timestamp: Date.now(),
    };

    if (tipoRegistro === "glicemia") {
      registro.valor = `${valor} mg/dL`;
    } else if (tipoRegistro === "pressao") {
      registro.valor = `${valor}/${valorSecundario} mmHg`;
      registro.detalhes = {
        sistolica: valor,
        diastolica: valorSecundario,
      };
    } else if (tipoRegistro === "batimentos") {
      registro.valor = `${valor} bpm`;
    }

    return registro;
  };

  const limparCampos = () => {
    setValor("");
    setValorSecundario("");
  };

  const showPicker = (currentMode) => {
    setMode(currentMode);
    setShowDatePicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    const currentDate = selectedDate || data;
    setShowDatePicker(Platform.OS === "ios");

    if (mode === "date" && Platform.OS === "android") {
      setData(currentDate);
      setTimeout(() => {
        showPicker("time");
      }, 200);
    } else {
      setData(currentDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {nomeUsuario ? `Registrar Saúde - ${nomeUsuario}` : "Registrar Saúde"}
      </Text>
      <Text style={styles.label}>Escolha o tipo de registro</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            tipoRegistro === "glicemia" && styles.radioButtonSelected,
          ]}
          onPress={() => {
            setTipoRegistro("glicemia");
            limparCampos();
          }}
        >
          <Text
            style={[
              styles.radioText,
              tipoRegistro === "glicemia" && styles.radioTextSelected,
            ]}
          >
            Glicemia
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            tipoRegistro === "pressao" && styles.radioButtonSelected,
          ]}
          onPress={() => {
            setTipoRegistro("pressao");
            limparCampos();
          }}
        >
          <Text
            style={[
              styles.radioText,
              tipoRegistro === "pressao" && styles.radioTextSelected,
            ]}
          >
            Pressão Arterial
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            tipoRegistro === "batimentos" && styles.radioButtonSelected,
          ]}
          onPress={() => {
            setTipoRegistro("batimentos");
            limparCampos();
          }}
        >
          <Text
            style={[
              styles.radioText,
              tipoRegistro === "batimentos" && styles.radioTextSelected,
            ]}
          >
            Batimentos Cardíacos
          </Text>
        </TouchableOpacity>
      </View>

      {tipoRegistro === "glicemia" ? (
        <View>
          <Text style={styles.label}>Valor da Glicemia (mg/dL)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 120"
            value={valor}
            onChangeText={setValor}
          />
        </View>
      ) : tipoRegistro === "pressao" ? (
        <View style={styles.dualInputContainer}>
          <View style={styles.dualInput}>
            <Text style={styles.label}>Sistólica</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Ex: 120"
              value={valor}
              onChangeText={setValor}
            />
          </View>
          <View style={styles.dualInput}>
            <Text style={styles.label}>Diastólica</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Ex: 80"
              value={valorSecundario}
              onChangeText={setValorSecundario}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Batimentos Cardíacos (bpm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 75"
            value={valor}
            onChangeText={setValor}
          />
        </View>
      )}

      <View style={styles.dateContainer}>
        <Text style={styles.label}>Data e Hora</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() =>
            Platform.OS === "ios"
              ? showPicker("datetime")
              : showPicker("date")
          }
        >
          <Ionicons name="calendar" size={20} color="#0277bd" />
          <Text style={styles.dateText}>
            {data.toLocaleDateString()} -{" "}
            {data.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode={mode}
          display="default"
          onChange={onChangeDate}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
        <Text style={styles.saveButtonText}>Salvar Registro</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0277bd",
    marginBottom: 20,
    textAlign: "center",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  radioButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  radioButtonSelected: {
    backgroundColor: "#0277bd",
    borderColor: "#0277bd",
  },
  radioText: {
    fontSize: 16,
    color: "#495057",
  },
  radioTextSelected: {
    color: "white",
  },
  label: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  dualInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dualInput: { width: "48%" },
  dateContainer: { marginBottom: 20 },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
  },
  dateText: { marginLeft: 10, fontSize: 16, color: "#495057" },
  saveButton: {
    backgroundColor: "#0277bd",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default RegistrarSaude;
