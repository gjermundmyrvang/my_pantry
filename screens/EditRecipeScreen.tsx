import { updateRecipe } from "../utils/storage";
import { RecipeForm } from "../components/RecipeForm";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { RecipeType } from "../types/Recipe";

type Props = NativeStackScreenProps<RootStackParamList, "EditRecipe">;

export const EditRecipe = ({ route, navigation }: Props) => {
  const { recipe } = route.params;

  const handleUpdate = async (updated: RecipeType) => {
    await updateRecipe(updated);
    navigation.pop();
    navigation.replace("Recipe", {
      recipe: updated,
    });
  };

  return (
    <RecipeForm
      initial={recipe}
      onSubmit={handleUpdate}
      submitLabel="Update Recipe"
    />
  );
};
