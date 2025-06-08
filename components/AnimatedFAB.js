import { StyleSheet } from "react-native";
import { AnimatedFAB } from "react-native-paper";

export const MyFAB = ({
  visible,
  extended,
  label,
  animateFrom = "right",
  style,
  onPress,
}) => {
  return (
    <AnimatedFAB
      icon="plus"
      label={extended ? label : undefined}
      extended={extended}
      onPress={onPress}
      visible={visible}
      animateFrom={animateFrom}
      style={[styles.fabStyle, style]}
    />
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
