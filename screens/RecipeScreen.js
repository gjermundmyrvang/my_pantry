import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import { Recipe } from "../components/Recipe";
import { useState } from "react";

export default function RecipeScreen({ route, navigation }) {
  const [recipe, setRecipe] = useState(route.params.recipe);

  const handleEdit = () => {
    navigation.navigate("EditRecipe", {
      recipe,
      onUpdate: (updated) => setRecipe(updated),
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header
        mode="small"
        elevated={true}
        style={{ backgroundColor: "#ececec" }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={recipe.title} />
        <Appbar.Action icon="pencil" onPress={handleEdit} />
      </Appbar.Header>
      <Recipe recipe={recipe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ececec",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
