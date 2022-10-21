import { Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

export interface CheckboxProps {
  checked: boolean;
  setCompleted: (boolean) => boolean;
}

export default function Checkbox(props: CheckboxProps) {
  //   const [checked, setChecked] = useState(props.checked);
  return (
    <Pressable
      style={styles.checkbox}
      onPress={() => {
        props.setCompleted(!props.checked);
      }}
    >
      {props.checked ? (
        <AntDesign name="smileo" size={30} color="gray" />
      ) : (
        <AntDesign name="meh" size={30} color="black" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    alignItems: "center",
    justifyContent: "center",
  },
});
