import React, { useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface BouncyViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  bounceCount?: number;
}

const BouncyView: React.FC<BouncyViewProps> = ({
  style,
  children,
  bounceCount = -1,
}) => {
  const bounceValue = useSharedValue(0);

  useEffect(() => {
    bounceValue.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      bounceCount,
      true
    );
  }, [bounceCount]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: bounceValue.value * 10, // Simplified amplitude adjustment
        },
      ],
    };
  });

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export default BouncyView;
