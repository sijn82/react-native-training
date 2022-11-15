import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";
import { Dimensions } from "react-native";

import {
  Animated,
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TodoStore } from "../../store/TodoStore";

import Todo from "./Todo";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";

export default function TodoList({ store }: { store: TodoStore }) {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Phone dimensions
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const fetchTodos = async () => {
    await store.getTodos();
    setTodos(store.todos);
    console.log(store.todos);
  };

  const renderTodo = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <View style={{ marginVertical: 5, alignContent: "center" }}>
          <Pressable onLongPress={drag}>
            <Todo key={item[0]} store={store} todo={item[1]}></Todo>
          </Pressable>
        </View>
      </ScaleDecorator>
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { width: windowWidth / 2 }]}
        onChangeText={setNewTodo}
        value={newTodo}
        placeholder="Add a new todo..."
      />
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 },
          styles.button,
          styles.button.save,
          { width: windowWidth / 2 },
        ]}
        onPress={() => {
          store.addTodo(newTodo);
          setNewTodo("");
          Keyboard.dismiss();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }}
      >
        <Text style={[styles.button.text]}>Add</Text>
      </Pressable>
      {todos && todos.length > 0 ? (
        // && store.todos.length > 0
        <View style={styles.container}>
          <DraggableFlatList
            data={todos}
            onDragEnd={({ data }) => setTodos(data)}
            renderItem={renderTodo}
            keyExtractor={(item) => item[1].id}
          />
        </View>
      ) : (
        // store.todos.map((todo) => {
        //   return <Todo key={todo[0]} store={store} todo={todo[1]}></Todo>;
        // })
        <Text style={styles.no_todos_text}> You have no todo's! </Text>
      )}

      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 },
          styles.button,
          styles.button.delete,
          { width: windowWidth / 2 },
        ]}
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
    marginTop: 20,
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
