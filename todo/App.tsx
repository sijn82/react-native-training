import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import Todo from "./components/todos/Todo";
import TodoList from "./components/todos/TodoList";
// import { TodoProvider } from "./store/TodoStore";
import { TodoStore } from "./store/TodoStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const store = new TodoStore();
  const TodoListObserved = observer(TodoList);
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <StatusBar style="auto" />
          <Text style={styles.title}>Todo's and Don'ts</Text>
        </View>
        <View style={styles.container}>
          <TodoListObserved store={store}></TodoListObserved>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
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
    marginTop: 80,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
