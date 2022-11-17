import { useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "../Checkbox";

import { TodoStore } from "../../store/TodoStore";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as Haptics from "expo-haptics";
import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

interface TodoProps {
  todo: {
    id: number;
    title: string;
    is_completed: boolean;
  };
  store: TodoStore;
  // drag: any;
}

export default function Todo(props: TodoProps) {
  const [completed, setCompleted] = useState<boolean>(props.todo.is_completed);

  // const { completeTodo, deleteTodo, todos } = new TodoStore();

  const applyStatusStyling = (status: boolean) => {
    return status ? styles.completed : styles.incomplete;
  };

  let additionalStyling = applyStatusStyling(completed);

  const renderLeftActions = (progress, drag) => {
    const opacity = drag.interpolate({
      inputRange: [0, 75],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <Animated.View style={[styles.swipeable, { opacity: opacity }]}>
        <Pressable
          style={[styles.button, styles.button.delete]}
          // onLongPress={props.drag}
          onPress={async () => {
            let result = await props.store.deleteTodo(props.todo);
            // I'm not sure I like this approach but I'm keeping this example here for now.
            // If only to generate feedback ;)
            result instanceof Error
              ? (Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Error
                ),
                alert(result.message))
              : Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                );
          }}
        >
          <Text style={[styles.button_text]}>Delete</Text>
        </Pressable>
      </Animated.View>
    );
  };

  useEffect(() => {
    if (completed !== props.todo.is_completed) {
      props.store.completeTodo(props.todo);
    }
  }, [completed]);

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View style={styles.todo}>
        <Text
          style={[
            styles.title,
            additionalStyling,
            { maxWidth: windowWidth - 150 },
          ]}
        >
          {props.todo.title}
        </Text>
        <Checkbox checked={completed} setCompleted={setCompleted}></Checkbox>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
    marginHorizontal: 30,
  },
  swipeable: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 30,
  },
  title: {
    marginRight: 10,
    fontSize: 20,
  },
  completed: {
    color: "gray",
    textDecorationLine: "line-through",
  },
  incomplete: {
    color: "black",
  },
  button: {
    // marginVertical: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",

    save: {
      backgroundColor: "darkseagreen",
    },
    delete: {
      backgroundColor: "tomato",
    },
  },
  button_text: {
    color: "white",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
