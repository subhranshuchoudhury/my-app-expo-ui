import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";

interface AnimatedTextProps {
  loop?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
}

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ZigZagColor: React.FC<AnimatedTextProps> = ({
  loop = true,
  style,
  children,
}) => {
  const progress = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    progress.value = loop
      ? withRepeat(
          withTiming(1, { duration: 5000, easing: Easing.linear }),
          -1,
          true
        )
      : withTiming(1, { duration: 5000, easing: Easing.linear });

    const glitchEffect = () => {
      translateX.value = withSequence(
        withTiming(getRandomInt(-10, 10), { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
      translateY.value = withSequence(
        withTiming(getRandomInt(-10, 10), { duration: 100 }),
        withTiming(0, { duration: 100 })
      );

      setTimeout(glitchEffect, getRandomInt(200, 500));
    };

    glitchEffect();
  }, [loop, progress, translateX, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 0.33, 0.66, 1],
      ["red", "green", "blue", "yellow"]
    );
    return {
      color,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedStyle, style]}>
        {children}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ZigZagColor;
