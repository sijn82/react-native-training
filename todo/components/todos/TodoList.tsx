import { useState } from "react";
import { View } from "react-native";

import Todo, { TodoProps } from "./Todo";

export interface TodoListProps {
  todos: TodoProps[];
}

export default function TodoList(props: TodoListProps) {
  const [todos, setTodos] = useState(props.todos);

  return (
    <View>
      {todos &&
        todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              is_completed={todo.is_completed}
            ></Todo>
          );
        })}
    </View>
  );
}
