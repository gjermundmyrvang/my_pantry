import { RecipeType } from "./Recipe";

export type RootStackParamList = {
  Home: undefined;
  Recipe: { recipe: RecipeType };
  NewRecipe: undefined;
  EditRecipe: { recipe: RecipeType; onUpdate?: (recipe: RecipeType) => void };
};
