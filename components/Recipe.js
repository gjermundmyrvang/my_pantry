import { Image, ScrollView, StyleSheet } from "react-native";
import { Icon, List, Text } from "react-native-paper";

export const Recipe = ({ recipe }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollTainer}
      nestedScrollEnabled={true}
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
        <Icon source="image-off-outline" size={40} />
      )}
      <Text variant="labelMedium" style={{ marginTop: 10 }}>
        {recipe.description}
      </Text>
      <List.Section>
        <List.Subheader style={styles.subheader}>Ingredients</List.Subheader>
        {recipe.ingredients.map((d) => (
          <List.Item
            key={d}
            title={d}
            left={() => <List.Icon icon="chevron-right" />}
          />
        ))}
      </List.Section>
      <List.Section>
        <List.Subheader style={styles.subheader}>Steps</List.Subheader>
        {recipe.steps.map((d, i) => (
          <List.Item
            key={d}
            title={d}
            left={() => <Text variant="labelLarge">{i + 1}.</Text>}
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
  subheader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200ee",
    marginVertical: 8,
  },
});
