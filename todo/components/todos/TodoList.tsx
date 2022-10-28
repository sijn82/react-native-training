import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Todo from "./Todo";

export default function TodoList({ store }) {
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    await store.getTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setNewTodo}
        value={newTodo}
        placeholder="Add a new todo..."
      />
      <Pressable
        style={[styles.button, styles.button.save]}
        onPress={() => {
          store.addTodo(newTodo);
          setNewTodo("");
          Keyboard.dismiss();
        }}
      >
        <Text style={styles.button.text}>Add</Text>
      </Pressable>
      {store.todos && store.todos.length > 0 ? (
        store.todos.map((todo) => {
          return <Todo key={todo[0]} todo={todo[1]}></Todo>;
        })
      ) : (
        <Text style={styles.no_todos_text}> You have no todo's! </Text>
      )}

      <Pressable
        style={[styles.button, styles.button.delete]}
        onPress={() => {
          store.clearAll();
        }}
      >
        <Text style={styles.button.text}>Clear Todos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
  },
  button: {
    marginVertical: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    text: {
      color: "white",
      fontSize: 20,
    },
    save: {
      backgroundColor: "darkseagreen",
    },
    delete: {
      backgroundColor: "tomato",
    },
  },
  no_todos_text: {
    fontSize: 30,
    marginVertical: 20,
  },
});
