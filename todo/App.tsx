import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import Todo from "./components/todos/Todo";
import TodoList from "./components/todos/TodoList";
// import { TodoProvider } from "./store/TodoStore";
import { TodoStore } from "./store/TodoStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

export default function App() {
  const store = new TodoStore();
  const TodoListObserved = observer(TodoList);
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <StatusBar style="auto" />
          <Text style={styles.title}>
            T
            <Entypo name="emoji-neutral" size={24} color="black" />
            d
            <Entypo name="emoji-happy" size={24} color="black" />
            's and D
            <Entypo name="emoji-flirt" size={24} color="black" />
            n'ts
          </Text>
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
