import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "recipes";

export const getRecipes = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Error reading recipes from AsyncStorage", e);
    return [];
  }
};

export const saveRecipe = async (recipe) => {
  try {
    const existing = await getRecipes();
    const updated = [...existing, recipe];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error saving recipe", e);
  }
};

export const deleteRecipe = async (id) => {
  const data = await AsyncStorage.getItem("recipes");
  const recipes = data ? JSON.parse(data) : [];

  const filtered = recipes.filter((r) => r.id !== id);
  await AsyncStorage.setItem("recipes", JSON.stringify(filtered));
};

export const updateRecipe = async (updatedRecipe) => {
  try {
    const existing = await getRecipes();
    const updatedList = existing.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  } catch (e) {
    console.error("Error updating recipe", e);
  }
};

export const clearRecipes = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Error clearing recipes", e);
  }
};
