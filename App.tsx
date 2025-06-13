import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { EditRecipe } from "./screens/EditRecipeScreen";
import Homescreen from "./screens/Homescreen";
import { NewRecipe } from "./screens/NewRecipeScreen";
import RecipeScreen from "./screens/RecipeScreen";
import { RootStackParamList } from "./types/navigation";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={paperTheme}>
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
