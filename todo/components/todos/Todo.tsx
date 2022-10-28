import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from "../Checkbox";

import { TodoStore } from "../../store/TodoStore";

interface TodoProps {
  todo: {
    id: number;
    title: string;
    is_completed: boolean;
  };
}

export default function Todo(props: TodoProps) {
  const [completed, setCompleted] = useState<boolean>(props.todo.is_completed);

  const { completeTodo } = new TodoStore();

  const applyStatusStyling = (status: boolean) => {
    return status ? styles.completed : styles.incomplete;
  };

  let additionalStyling = applyStatusStyling(completed);

  useEffect(() => {
    if (completed !== props.todo.is_completed) {
      completeTodo(props.todo);
    }
  }, [completed]);

  return (
    <View style={styles.todo}>
      <Text style={[styles.title, additionalStyling]}>{props.todo.title}</Text>
      <Checkbox checked={completed} setCompleted={setCompleted}></Checkbox>
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  title: {
    marginRight: 10,
    fontSize: 30,
  },
  completed: {
    color: "gray",
    textDecorationLine: "line-through",
  },
  incomplete: {
    color: "black",
  },
});
