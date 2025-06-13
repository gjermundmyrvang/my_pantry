import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkThemeBase,
} from "react-native-paper";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200EE", // Purple
    secondary: "#EBDDFF", // Light pink
    background: "#ECECEC", // Light grey
  },
};

export const darkTheme = {
  ...DarkThemeBase,
  colors: {
    ...DarkThemeBase.colors,
    primary: "#6200EE", // Purple
    secondary: "#3F237C", // Light pink
    background: "#1C0F38", // Dark Purple
    secondaryContainer: "#A98AD6",
    outline: "#A98AD6",
  },
};
