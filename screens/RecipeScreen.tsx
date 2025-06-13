import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { Recipe } from "../components/Recipe";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Recipe">;

export default function RecipeScreen({ route, navigation }: Props) {
  const { recipe } = route.params;

  const { colors } = useTheme();

  const handleEdit = () => {
    navigation.navigate("EditRecipe", {
      recipe,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Appbar.Header
        mode="small"
        elevated={true}
        style={{ backgroundColor: colors.background }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={recipe.title} />
        <Appbar.Action icon="pencil" onPress={handleEdit} />
      </Appbar.Header>
      <Recipe recipe={recipe} />
    </View>
  );
}
