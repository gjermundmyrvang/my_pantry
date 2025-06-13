import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Icon, List, Text, useTheme } from "react-native-paper";
import { RecipeType } from "../types/Recipe";

type RecipeProps = {
  recipe: RecipeType;
};

export const Recipe = ({ recipe }: RecipeProps) => {
  const { colors } = useTheme();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollTainer}
    >
      {recipe.image ? (
        <Image
          source={{ uri: recipe.image }}
          style={{
            width: "100%",
            height: 300,
            borderRadius: 8,
            marginTop: 8,
          }}
        />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon source="image-off-outline" size={40} />
          <Text variant="labelMedium">Edit recipe to add an image</Text>
        </View>
      )}
      <Text variant="labelMedium" style={{ marginTop: 10 }}>
        {recipe.description}
      </Text>
      <List.Section>
        <List.Subheader
          style={{ color: colors.primary, fontSize: 18, fontWeight: "bold" }}
        >
          Ingredients
        </List.Subheader>
        {recipe.ingredients.map((d) => (
          <List.Item
            key={d}
            title={d}
            left={() => <List.Icon icon="chevron-right" />}
          />
        ))}
      </List.Section>
      <List.Section style={{ paddingBottom: 50 }}>
        <List.Subheader
          style={{ color: colors.primary, fontSize: 18, fontWeight: "bold" }}
        >
          Steps
        </List.Subheader>
        {recipe.steps.map((d, i) => (
          <List.Item
            key={`Step: ${i + 1}`}
            title={d}
            titleNumberOfLines={4}
            left={() => <Text variant="titleMedium">{i + 1}.</Text>}
          />
        ))}
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollTainer: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 8,
    marginHorizontal: 10,
  },
});
