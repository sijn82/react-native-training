import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import Todo from "./components/todos/Todo";
import TodoList from "./components/todos/TodoList";
// import { TodoProvider } from "./store/TodoStore";
import { TodoStore } from "./store/TodoStore";

export default function App() {
  const store = new TodoStore();
  const TodoListObserved = observer(TodoList);
  return (
    <View style={styles.container}>
      <View>
        <StatusBar style="auto" />
        <Text style={styles.header}>Todo's and Don'ts</Text>
      </View>
      <View style={styles.container}>
        <TodoListObserved store={store}></TodoListObserved>
      </View>
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
  header: {
    fontSize: 30,
    marginTop: 80,
    fontWeight: "bold",
  },
});
