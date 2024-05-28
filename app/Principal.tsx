import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

// Definición de la interfaz Task para tipar las tareas
interface Task {
  key: string;
  text: string;
}

export function Principal() {
  // Estado para manejar el mensaje mostrado en la pantalla
  const [message, setMessage] = useState<string>(
    "Presione cuales son las tareas que desee ver"
  );
  // Estado para manejar la lista de tareas completadas
  const [tareasCompletadas, setTareasCompletadas] = useState<Task[]>([]);
  // Estado para manejar la lista de tareas por hacer
  const [tareasPorHacer, setTareasPorHacer] = useState<Task[]>([]);
  // Estado para manejar el texto ingresado en el TextInput de tareas por hacer
  const [inputTareaPorHacer, setInputTareaPorHacer] = useState<string>("");
  // Estado para manejar el texto ingresado en el TextInput de tareas completadas
  const [inputTareaCompletada, setInputTareaCompletada] = useState<string>("");

  // Función para actualizar el mensaje con las tareas por hacer
  const tareasPendientes = () => {
    // Une las tareas por hacer con un salto de línea y las establece en el mensaje
    setMessage(tareasPorHacer.map((task) => task.text).join("\n"));
  };

  // Función para actualizar el mensaje con las tareas completadas
  const tareasHechas = () => {
    // Une las tareas completadas con un salto de línea y las establece en el mensaje
    setMessage(tareasCompletadas.map((task) => task.text).join("\n"));
  };

  // Función para manejar el evento de envío del TextInput de tareas por hacer
  const handleTareaPorHacerSubmit = () => {
    // Comprueba si el texto ingresado no está vacío
    if (inputTareaPorHacer.trim()) {
      // Crea un nuevo objeto de tarea con un key único y el texto ingresado
      const newTask: Task = {
        key: Date.now().toString(),
        text: inputTareaPorHacer,
      };
      // Actualiza el estado de las tareas por hacer con la nueva tarea añadida
      setTareasPorHacer([...tareasPorHacer, newTask]);
      // Limpia el TextInput
      setInputTareaPorHacer("");
    }
  };

  // Función para manejar el evento de envío del TextInput de tareas completadas
  const handleTareaCompletadaSubmit = () => {
    // Comprueba si el texto ingresado no está vacío
    if (inputTareaCompletada.trim()) {
      // Crea un nuevo objeto de tarea con un key único y el texto ingresado
      const newTask: Task = {
        key: Date.now().toString(),
        text: inputTareaCompletada,
      };
      // Actualiza el estado de las tareas completadas con la nueva tarea añadida
      setTareasCompletadas([...tareasCompletadas, newTask]);
      // Limpia el TextInput
      setInputTareaCompletada("");
    }
  };

  // Función para eliminar una tarea por hacer
  const eliminarTareaPorHacer = (key: string) => {
    // Filtra la lista de tareas por hacer para excluir la tarea con el key proporcionado
    setTareasPorHacer(tareasPorHacer.filter((task) => task.key !== key));
  };

  // Función para eliminar una tarea completada
  const eliminarTareaCompletada = (key: string) => {
    // Filtra la lista de tareas completadas para excluir la tarea con el key proporcionado
    setTareasCompletadas(tareasCompletadas.filter((task) => task.key !== key));
  };

  return (
    <View style={styles.container}>
      {/* Muestra el mensaje actual */}
      <Text style={styles.text}>{message}</Text>
      {/* Botón para mostrar las tareas por hacer */}
      <Button title="Pendientes" onPress={tareasPendientes} />
      {/* Botón para mostrar las tareas completadas */}
      <Button title="Hechos" onPress={tareasHechas} />
      {/* TextInput para ingresar nuevas tareas por hacer */}
      <TextInput
        style={styles.input}
        placeholder="Escriba nuevas tareas pendientes"
        onChangeText={setInputTareaPorHacer}
        value={inputTareaPorHacer}
        onSubmitEditing={handleTareaPorHacerSubmit}
      />
      {/* TextInput para ingresar nuevas tareas completadas */}
      <TextInput
        style={styles.input}
        placeholder="Escriba nuevas tareas ya completadas"
        onChangeText={setInputTareaCompletada}
        value={inputTareaCompletada}
        onSubmitEditing={handleTareaCompletadaSubmit}
      />
      <Text style={styles.subHeader}>Tareas Por Hacer</Text>
      {/* FlatList para mostrar las tareas por hacer */}
      <FlatList
        data={tareasPorHacer}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text>{item.text}</Text>
            {/* Botón para eliminar una tarea por hacer */}
            <Button
              title="Eliminar"
              onPress={() => eliminarTareaPorHacer(item.key)}
            />
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
      <Text style={styles.subHeader}>Tareas Completadas</Text>
      {/* FlatList para mostrar las tareas completadas */}
      <FlatList
        data={tareasCompletadas}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text>{item.text}</Text>
            {/* Botón para eliminar una tarea completada */}
            <Button
              title="Eliminar"
              onPress={() => eliminarTareaCompletada(item.key)}
            />
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}

// Estilos para los componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    width: "80%",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
});
