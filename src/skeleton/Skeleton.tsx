import React, { useEffect } from "react";
import { StyleSheet, View, Animated, useWindowDimensions } from "react-native";

export const Skeleton = () => {
  const dimensions = useWindowDimensions();
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startAnimation();

    const interval = setInterval(() => {
      animatedValue.setValue(0);
      startAnimation();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const transformX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, dimensions.width],
  });

  return (
    <View style={[styles.image_skeleton, { width: dimensions.width - 16 }]}>
      <Animated.View
        style={[
          styles.animated_view,
          { transform: [{ translateX: transformX }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image_skeleton: {
    height: 120,
    borderRadius: 4,
    backgroundColor: "#ECEFF1",
    overflow: "hidden",
    margin: 8,
  },
  animated_view: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 20,
    height: "100%",
  },
});
