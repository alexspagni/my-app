import React, { useEffect } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { Easing } from "react-native-reanimated";
//Here i made an anitmation that is shown every time that a user make a search
export const GravitazionalWave = () => {
  const animatedValue1 = React.useRef(new Animated.Value(0)).current;
  /**
   * In order to make an animation you need the library animate.
   * Animation start at value 0 and end to value 1.
   * These animation is render every 4050ms so it can runs into a loop
   */
  const animation = () => {
    Animated.timing(animatedValue1, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation();

    const interval = setInterval(() => {
      animatedValue1.setValue(0);
      animation();
    }, 4050);

    return () => clearInterval(interval);
  }, []);
  /**
   * thise trasforms allow image to move around the screen
   */
  const transformX = animatedValue1.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [150, 250, 150, 50, 150],
  });
  const transformY = animatedValue1.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [-50, -75, -100, -75, -50],
  });
  const trasformScale = animatedValue1.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [1, 0.7, 0.5, 0.7, 1],
  });
  return (
    <View style={styles.ContainerStyle}>
      <Animated.Image
        source={require("../../assets/gravitazionalBall.jpg")}
        resizeMode="contain"
        style={[
          styles.image_skeleton,
          {
            transform: [
              { translateX: transformX },
              { translateY: transformY },
              { scale: trasformScale },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image_skeleton: {
    marginTop: 300,
    height: 75,
    width: 75,
    overflow: "hidden",
  },
  ContainerStyle: {
    backgroundColor: "#181A1C",
    flex: 1,
  },
});
