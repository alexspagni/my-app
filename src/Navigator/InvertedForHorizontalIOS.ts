import { StackCardInterpolationProps } from "@react-navigation/stack";
import { multiply } from "react-native-reanimated";

export function invertedForHorizontalIOS({ current, next, inverted, layouts: { screen }, }: StackCardInterpolationProps) {

    const translateFocused = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-1*screen.width, 0],
      extrapolate: 'clamp'
    });
    /*
    const translateUnfocused = next ? next.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.width * -0.7,0],
      extrapolate: 'clamp'
    }) : 0;
    */
    const overlayOpacity = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.07],
      extrapolate: 'clamp'
    });
    const shadowOpacity = current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.3],
      extrapolate: 'clamp'
    });
    return {
      cardStyle: {
        transform: [// Translation for the animation of the current card
        {
          translateX: translateFocused
        }, // Translation for the animation of the card on top of this
]
      },
      overlayStyle: {
        opacity: overlayOpacity
      },
      shadowStyle: {
        shadowOpacity
      }
    };
  }