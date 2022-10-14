import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [showHelloWorld, setShowHelloWorld] = useState(false);
  return (
    <View style={styles.container}>
      <Button
        title={showHelloWorld ? "Reset Me" : "Press Me"}
        color="cornflowerblue"
        onPress={() => {
          {
            setShowHelloWorld(!showHelloWorld);
          }
        }}
      ></Button>
      {showHelloWorld && (
        <Text style={styles.hello_world_text}>Hello World</Text>
      )}
      <StatusBar style="auto" />
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
  hello_world_text: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
  },
});
