import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Animated, Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [showHelloWorld, setShowHelloWorld] = useState(false);
  const [springValue, setSpringValue] = useState(new Animated.Value(0.3));
  const spring = () => {
    springValue.resetAnimation();
    Animated.spring(springValue, {
      toValue: 40,
      friction: 1,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Button
        title={showHelloWorld ? "Reset Me" : "Press Me"}
        color="cornflowerblue"
        onPress={() => {
          {
            setShowHelloWorld(!showHelloWorld);
            spring();
          }
        }}
      ></Button>
      {showHelloWorld && (
        <Animated.Text
          style={[styles.hello_world_text, { fontSize: springValue }]}
        >
          Hello World
        </Animated.Text>
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
