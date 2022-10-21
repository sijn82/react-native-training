import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from "../Checkbox";

export interface TodoProps {
  id: number;
  title: string;
  is_completed: boolean;
}

export default function Todo(props: TodoProps) {
  const [completed, setCompleted] = useState(props.is_completed);

  const applyStatusStyling = (status: boolean) => {
    return status ? styles.completed : styles.incomplete;
  };

  let additionalStyling = applyStatusStyling(completed);

  return (
    <View style={styles.todo}>
      <Text style={[styles.title, additionalStyling]}>{props.title}</Text>
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
