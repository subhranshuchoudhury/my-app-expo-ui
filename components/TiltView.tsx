import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
  withRepeat,
} from "react-native-reanimated";

interface TiltEffectProps {
  angle?: number;
  loop?: boolean;
  repeat?: number;
  children?: ReactNode;
}

const TiltEffect: React.FC<TiltEffectProps> = ({
  angle = 10,
  loop = false,
  repeat = 1,
  children,
}) => {
  const rotation = useSharedValue(0);

  const createTiltAnimation = () => {
    const sequence = withSequence(
      withTiming(-angle, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      withTiming(angle, { duration: 1000, easing: Easing.inOut(Easing.ease) })
    );

    return loop
      ? withRepeat(sequence, -1, true)
      : withRepeat(sequence, repeat, true);
  };

  rotation.value = withSequence(
    createTiltAnimation(),
    withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return <Animated.View style={[animatedStyle]}>{children}</Animated.View>;
};

export default TiltEffect;
