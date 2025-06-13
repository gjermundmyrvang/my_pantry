import { AnimatedFAB, useTheme } from "react-native-paper";

type FABProps = {
  visible: boolean;
  extended: boolean;
  label: string;
  onPress: () => void;
};

export const MyFAB = ({ visible, extended, label, onPress }: FABProps) => {
  const { colors } = useTheme();
  return (
    <AnimatedFAB
      icon="plus"
      label={extended ? label : ""}
      extended={extended}
      onPress={onPress}
      visible={visible}
      style={{
        position: "absolute",
        bottom: 16,
        right: 16,
        backgroundColor: colors.secondary,
      }}
    />
  );
};
