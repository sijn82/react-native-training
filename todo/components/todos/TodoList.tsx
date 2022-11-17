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
  // const [todos, setTodos] = useState([]);

  // Phone dimensions
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const fetchTodos = async () => {
    await store.getTodos();
    // setTodos(store.todos);
    // console.log(store.todos);
  };

  const renderTodo = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <View style={{ marginVertical: 5, alignContent: "center" }}>
          <Pressable onLongPress={drag} disabled={isActive}>
            <Todo key={item[0]} store={store} todo={item[1]}></Todo>
          </Pressable>
        </View>
      </ScaleDecorator>
    );
  };

  useEffect(() => {
    fetchTodos();
    console.log(store.todos);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.new_todo}>
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
            { width: windowWidth / 4 },
          ]}
          onPress={() => {
            store.addTodo(newTodo);
            setNewTodo("");
            // fetchTodos();
            Keyboard.dismiss();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }}
        >
          <Text style={[styles.button.text]}>Add</Text>
        </Pressable>
      </View>

      {store.todos && store.todos.length > 0 ? (
        <View style={styles.container}>
          <DraggableFlatList
            data={store.todos}
            // data={todos}
            onDragEnd={({ data }) => {
              // console.log("is it this that's filling the logs?"),
              //   console.log(data[1]),

              store.updateTodoPriorities(data);
              // setTodos(data);
              // fetchTodos();
            }}
            renderItem={renderTodo}
            keyExtractor={(item) => {
              // console.log("Priority");
              // console.log(item[1].priority);
              return item[1].priority;
            }}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.no_todos_text}> You have no todo's! </Text>
        </View>
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
  new_todo: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  input: {
    marginRight: 20,
    height: 50,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
  },
  button: {
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
      marginVertical: 20,
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
