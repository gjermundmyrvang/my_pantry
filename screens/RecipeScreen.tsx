import { StyleSheet, View } from "react-native";
import { Appbar } from "react-native-paper";
import { Recipe } from "../components/Recipe";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { RecipeType } from "../types/Recipe";

type Props = NativeStackScreenProps<RootStackParamList, "Recipe">;

export default function RecipeScreen({ route, navigation }: Props) {
  const { recipe } = route.params;

  const handleEdit = () => {
    navigation.navigate("EditRecipe", {
      recipe,
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
