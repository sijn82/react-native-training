import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeAutoObservable, runInAction } from "mobx";

export class TodoStore {
  todos = [];

  constructor() {
    makeAutoObservable(this);
  }
  // Used in addTodo
  calculateId(todos) {
    let maxValue = 0;

    if (todos.length > 0) {
      maxValue = Math.max.apply(
        null,
        todos.map(function (todo) {
          return todo[1].id;
        })
      );
    }
    return maxValue + 1;
  }
  // Used in addTodo
  saveTodo = async (key, todo) => {
    try {
      const jsonTodo = JSON.stringify(todo);

      // console.log(key);
      await AsyncStorage.setItem(key, jsonTodo);

      console.log(this.todos);

      runInAction(() => this.todos.push([key, todo]));
    } catch (error) {
      alert(error);
    }
  };

  addTodo = async (title) => {
    if (!title) {
      return alert(
        "Your todo was blank! Type something in the input before trying to add it."
      );
    }
    // Check the list of todo's for the (currently) highest id, then increment it for this new todo's id
    let id = this.calculateId(this.todos);
    // We'll use priority to order the todos when displayed as a list
    let priority = this.todos.length + 1;

    let todo = {
      id: id, // I know id isn't currently used for anything but maybe in future :)
      title: title,
      is_completed: false,
      priority: priority,
    };

    let key = "@todo-" + id;

    await this.saveTodo(key, todo);
  };

  completeTodo = async (todo) => {
    let key = "@todo-" + todo.id;

    todo.is_completed = !todo.is_completed;

    try {
      const jsonTodo = JSON.stringify(todo);
      await AsyncStorage.setItem(key, jsonTodo);
    } catch (error) {
      alert(error);
    }
  };

  // Used in getTodos
  reformatTodos = (readonlyTodos) => {
    let reformattedTodos = [];
    readonlyTodos.map(function (todo) {
      reformattedTodos.push([todo[0], JSON.parse(todo[1])]);
    });

    return reformattedTodos;
  };

  reorderTodos = (reformattedTodos) => {
    let reorderedTodos = [...reformattedTodos].sort(
      (a, b) => a[1].priority - b[1].priority
    );

    return reorderedTodos;
  };

  deleteTodo = async (todo) => {
    let key = "@todo-" + todo.id;

    try {
      await AsyncStorage.removeItem(key);

      runInAction(() => {
        let index = this.todos.findIndex((todo) => {
          return todo[0] === key;
        });

        // As -1 will delete the last item in the array
        // but -1 also means we didn't find the key
        // we should just ignore that result
        // rather than deleting the todo from this.todos
        if (index !== -1) {
          this.todos.splice(index, 1);
        }
      });
      return true;
    } catch (error) {
      return error;
    }
  };

  getTodos = async () => {
    let keys: ReadonlyArray<string> = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (error) {
      alert(error);
    }
    let todo_keys = [];
    runInAction(() => {
      keys.forEach((key) => {
        // Right now the only keys I'm creating are todo's
        // however I still think it's a good idea to check
        // that the key includes '@todo' in the string before retrieving them all anyway
        if (key.includes("@todo")) {
          todo_keys.push(key);
        }
      });
    });

    try {
      let readonlyTodos = await AsyncStorage.multiGet(todo_keys);

      runInAction(() => {
        // Reformat todos to remove the readonly trait
        const reformattedTodos = this.reformatTodos(readonlyTodos);
        // Reorder the todos by priority
        const reorderedTodos = this.reorderTodos(reformattedTodos);
        // Set the reformatted/reordered todos to the store observed variable
        this.todos = reorderedTodos;
      });
    } catch (error) {
      alert(error);
    }

    return this.todos;
  };

  updateTodoPriorities = (todos) => {
    // Set this.todos to match the new priority order
    // before we call asyncstorage in order to prevent
    // the list from stuttering briefly back to the original state
    // while asyncstorage sets the new values officially.
    runInAction(() => {
      this.todos = todos;
    });

    todos.map(async (todo, index) => {
      todo[1].priority = index;

      try {
        const jsonTodo = JSON.stringify(todo[1]);
        await AsyncStorage.setItem(todo[0], jsonTodo);

        runInAction(() => {
          // while this step is unnecessary it as it should match this.todos already
          // It just confirms we're working with accurate data before further changes
          // are made
          this.getTodos();
        });
      } catch (error) {
        alert(error);
      }
    });
  };

  clearAll = async () => {
    try {
      await AsyncStorage.clear();

      runInAction(() => {
        this.todos = [];
      });
    } catch (error) {
      alert(error);
    }
  };
}
