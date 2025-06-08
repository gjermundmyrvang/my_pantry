import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { IconButton, List, SegmentedButtons, Text } from "react-native-paper";
import { MyFAB } from "../components/AnimatedFAB";
import { clearRecipes, getRecipes, updateRecipe } from "../utils/storage";
import { useCallback } from "react";

const screenHeight = Dimensions.get("window").height;

export default function Homescreen() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isExtended, setIsExtended] = useState(true);
  const navigation = useNavigation();

  const filteredRecipes =
    filter === "fav" ? recipes.filter((r) => r.favorite) : recipes;

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    const data = await getRecipes();
    if (data) {
      setRecipes(data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRecipes();
    }, [])
  );

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    await loadRecipes();
  };

  const clearAll = async () => {
    await clearRecipes();
    await loadRecipes();
  };

  const toggleFavorite = async (id) => {
    const updatedRecipes = recipes.map((r) =>
      r.id === id ? { ...r, favorite: !r.favorite } : r
    );
    setRecipes(updatedRecipes);

    const toggled = updatedRecipes.find((r) => r.id === id);
    await updateRecipe(toggled);
  };

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const handleItemPressed = (item) => {
    console.log("Item:", item.title);
    navigation.navigate("Recipe", { recipe: item });
  };

  const handleFABPressed = () => {
    navigation.navigate("NewRecipe");
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        stickyHeaderIndices={[0]}
      >
        <SegmentedButtons
          value={filter}
          onValueChange={setFilter}
          style={{ backgroundColor: "#ececec" }}
          buttons={[
            {
              value: "all",
              label: "All Recipes",
              icon: "folder-outline",
            },
            {
              value: "fav",
              label: "Favorite Recipes",
              icon: "folder-star-outline",
            },
          ]}
        />
        {filteredRecipes.map((d) => (
          <List.Item
            key={d.id}
            onPress={() => handleItemPressed(d)}
            title={d.title}
            description={d.description}
            left={(props) => <List.Icon {...props} icon="hamburger" />}
            right={(props) => (
              <IconButton
                {...props}
                icon={d.favorite ? "star" : "star-outline"}
                onPress={() => toggleFavorite(d.id)}
                size={20}
              />
            )}
          />
        ))}
        {filteredRecipes.length === 0 && (
          <Text variant="labelLarge" style={{ marginTop: 20 }}>
            Pantry is curently empty :(
          </Text>
        )}
        <StatusBar style="auto" />
      </ScrollView>

      <MyFAB
        extended={isExtended}
        label={"New Recipe"}
        animateFrom={16}
        visible={true}
        style={{ paddingRight: 10 }}
        onPress={handleFABPressed}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    minHeight: "100%",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  sheetContent: {
    height: screenHeight * 0.9,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
});
