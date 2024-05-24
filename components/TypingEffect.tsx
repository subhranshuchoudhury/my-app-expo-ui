// TypingEffect.tsx
import React, { useEffect, useState } from "react";
import { Text, TextProps } from "react-native";

interface TypingEffectProps extends TextProps {
  loop?: boolean;
  duration?: number;
  delay?: number;
  children: string[];
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  loop = false,
  duration = 100,
  delay = 1000,
  children,
  ...props
}) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [stringIndex, setStringIndex] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (index < children[stringIndex].length) {
      interval = setInterval(() => {
        setText((prev) => prev + children[stringIndex][index]);
        setIndex((prev) => prev + 1);
      }, duration);
    } else if (stringIndex < children.length - 1) {
      interval = setTimeout(() => {
        setText("");
        setIndex(0);
        setStringIndex((prev) => prev + 1);
      }, delay);
    } else if (loop) {
      interval = setTimeout(() => {
        setText("");
        setIndex(0);
        setStringIndex(0);
      }, delay);
    }

    return () => clearInterval(interval);
  }, [index, stringIndex, children, duration, delay, loop]);

  return <Text {...props}>{text}</Text>;
};

export default TypingEffect;
