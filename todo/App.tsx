import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import Todo from "./components/todos/Todo";
import TodoList from "./components/todos/TodoList";

export default function App() {
  const todos = [
    {
      id: 1,
      title: "First todo",
      is_completed: false,
    },
    {
      id: 2,
      title: "Second todo",
      is_completed: true,
    },
    {
      id: 3,
      title: "Third todo",
      is_completed: false,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Todo's and Dont's</Text>
      <TodoList todos={todos}></TodoList>
      {/* <Todo id={1} title={"First todo"} is_completed={false}></Todo> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
