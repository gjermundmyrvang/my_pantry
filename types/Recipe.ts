export type RecipeType = {
  id: string;
  title: string;
  description: string;
  image?: string;
  ingredients: string[];
  steps: string[];
  [key: string]: any; // for any extra fields
};
