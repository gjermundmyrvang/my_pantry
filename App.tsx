import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from "./screens/Homescreen";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import RecipeScreen from "./screens/RecipeScreen";
import { NewRecipe } from "./screens/NewRecipeScreen";
import { EditRecipe } from "./screens/EditRecipeScreen";
import { RootStackParamList } from "./types/navigation";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200ee",
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Homescreen} />
          <Stack.Screen name="Recipe" component={RecipeScreen} />
          <Stack.Screen name="NewRecipe" component={NewRecipe} />
          <Stack.Screen name="EditRecipe" component={EditRecipe} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
