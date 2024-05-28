import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

export function Principalcopy() {
  const [message, setMessage] = useState(
    "Presione cuales son las tareas que desee ver"
  );
  const [tareasCompletadas, setTareasCompletadas] = useState("");
  const [tareasPorHacer, setTareasPorHacer] = useState("");

  const [inputTareaPorHacer, setInputTareaPorHacer] = useState("");
  const [inputTareaCompletada, setInputTareaCompletada] = useState("");

  const tareasPendientes = () => {
    setMessage(tareasPorHacer);
  };

  const tareasHechas = () => {
    setMessage(tareasCompletadas);
  };

  const handleTareaPorHacerSubmit = () => {
    if (inputTareaPorHacer.trim()) {
      setTareasPorHacer(
        tareasPorHacer
          ? `${tareasPorHacer}\n${inputTareaPorHacer}`
          : inputTareaPorHacer
      );
      setInputTareaPorHacer("");
    }
  };

  const handleTareaCompletadaSubmit = () => {
    if (inputTareaCompletada.trim()) {
      setTareasCompletadas(
        tareasCompletadas
          ? `${tareasCompletadas}\n${inputTareaCompletada}`
          : inputTareaCompletada
      );
      setInputTareaCompletada("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Pendientes" onPress={tareasPendientes} />
      <Button title="Hechos" onPress={tareasHechas} />
      <TextInput
        style={styles.input}
        placeholder="Escriba nuevas tareas"
        onChangeText={setInputTareaPorHacer}
        value={inputTareaPorHacer}
        onSubmitEditing={handleTareaPorHacerSubmit}
      />
      <TextInput
        style={styles.input}
        placeholder="Escriba nuevas tareas"
        onChangeText={setInputTareaCompletada}
        value={inputTareaCompletada}
        onSubmitEditing={handleTareaCompletadaSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "80%", // Para que el input tenga un ancho del 80% del contenedor
  },
});
