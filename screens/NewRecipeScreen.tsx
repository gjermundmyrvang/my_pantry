import { saveRecipe } from "../utils/storage";
import { useNavigation } from "@react-navigation/native";
import { RecipeForm } from "../components/RecipeForm";
import { RecipeType } from "../types/Recipe";

export const NewRecipe = () => {
  const navigation = useNavigation();

  const handleSave = async (recipe: RecipeType) => {
    await saveRecipe(recipe);
    navigation.goBack();
  };

  return <RecipeForm onSubmit={handleSave} submitLabel="Save Recipe" />;
};
