import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Animated, Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [showHelloWorld, setShowHelloWorld] = useState(false);
  const [springValue, setSpringValue] = useState(new Animated.Value(0));
  const [timingValue, setTimingValue] = useState(new Animated.Value(0));

  const [transformedText, setTransformedText] = useState([]);
  const [animatedValues, setAnimatedValues] = useState([]);

  const spring = async () => {
    // animate();

    Animated.sequence([
      Animated.spring(springValue, {
        toValue: 30,
        bounciness: 15,
        speed: 10,
        useNativeDriver: false, // style prop fontSize not supported by animated module
      }),

      Animated.timing(timingValue, {
        toValue: 40,
        duration: 1000,
        useNativeDriver: false, // style prop fontSize not supported by animated module
      }),

      Animated.spring(springValue, {
        toValue: 60,
        bounciness: 20,
        speed: 6,
        useNativeDriver: false, // style prop fontSize not supported by animated module
      }),
    ]).start();
  };

  const colouriseText = (index: number) => {
    let selectedColour = undefined;

    if (index % 5 == 0) {
      selectedColour = styles.yellow;
    } else if (index % 3 == 0) {
      selectedColour = styles.red;
    } else if (index % 2 == 0) {
      selectedColour = styles.green;
    } else {
      selectedColour = styles.cyan;
    }

    return selectedColour;
  };

  const transformText = (text: string) => {
    const textArray = text.split("");

    textArray.forEach(() => {
      setAnimatedValues((prevValues) => [...prevValues, new Animated.Value(0)]);
    });

    setTransformedText(textArray);
  };

  const animate = async () => {
    let animations = transformedText.map((character, index) => {
      return Animated.timing(animatedValues[index], {
        toValue: 30,
        duration: 250,
        useNativeDriver: false,
      });
    });

    Animated.stagger(100, animations).start();
  };

  const resetAnimations = () => {
    // spring value doesn't need to be reset as the first animation effectively resets it from 60 back to 30 anyway.

    // resetAnimation didn't work resetting my colours (timingValue) but manually setting the value does.
    timingValue.setValue(0);

    // however resetting the animatedValues this way does work - would love to know why?
    animatedValues.forEach((value) => {
      value.resetAnimation();
    });
  };

  useEffect(() => {
    transformText("hello world");
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: timingValue.interpolate({
            inputRange: [0, 40],
            outputRange: ["rgb(255, 153, 204)", "rgb(153, 204, 255)"],
          }),
        },
      ]}
    >
      {showHelloWorld ? (
        <Button
          title="Reset Me"
          color="khaki"
          onPress={() => {
            {
              setShowHelloWorld(!showHelloWorld);
              resetAnimations();
            }
          }}
        ></Button>
      ) : (
        <Button
          title="Press Me"
          color="darkseagreen"
          onPress={async () => {
            {
              setShowHelloWorld(!showHelloWorld);
              animate();
              spring();
            }
          }}
        ></Button>
      )}

      {showHelloWorld && (
        <Animated.View style={[styles.hello_world_text]}>
          {transformedText.map((character, index) => {
            const selectedColour = colouriseText(index);

            return (
              <Animated.Text
                key={index}
                style={[
                  styles.hello_world_text,
                  selectedColour,
                  {
                    transform: [
                      {
                        translateY: animatedValues[index],
                      },
                    ],
                    fontSize: springValue,
                    opacity: animatedValues[index].interpolate({
                      inputRange: [0, 20],
                      outputRange: [0, 1],
                    }),
                  },
                ]}
              >
                {character}
              </Animated.Text>
            );
          })}
        </Animated.View>
      )}

      <StatusBar style="auto" />
    </Animated.View>
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
    fontSize: 20,
    fontWeight: "bold",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  transform_text: {
    transform: [
      {
        rotate: "45deg",
      },
    ],
  },
  red: {
    color: "tomato",
  },
  green: {
    color: "darkseagreen",
  },
  cyan: {
    color: "darkcyan",
  },
  yellow: {
    color: "khaki",
  },
});
