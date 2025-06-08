import { SafeAreaView, StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { Recipe } from "../components/Recipe";

export default function RecipeScreen({ route, navigation }) {
  const { recipe } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text variant="headlineLarge">{recipe.title}</Text>
      </View>
      <Recipe recipe={recipe} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
