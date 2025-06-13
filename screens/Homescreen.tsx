import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import {
  IconButton,
  List,
  MD3Colors,
  SegmentedButtons,
  Text,
} from "react-native-paper";
import { MyFAB } from "../components/AnimatedFAB";
import {
  clearRecipes,
  deleteRecipe,
  getRecipes,
  updateRecipe,
} from "../utils/storage";
import { RecipeType } from "../types/Recipe";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

const screenHeight = Dimensions.get("window").height;

export default function Homescreen() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [filter, setFilter] = useState<"all" | "fav">("all");
  const [isExtended, setIsExtended] = useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

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

  const handleDelete = async (id: string) => {
    await deleteRecipe(id);
    await loadRecipes();
  };

  const clearAll = async () => {
    await clearRecipes();
    await loadRecipes();
  };

  const toggleFavorite = async (id: string) => {
    const updatedRecipes = recipes.map((r) =>
      r.id === id ? { ...r, favorite: !r.favorite } : r
    );
    setRecipes(updatedRecipes);

    const toggled = updatedRecipes.find((r) => r.id === id);
    if (toggled) {
      await updateRecipe(toggled);
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(event.nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const handleItemPressed = (item: RecipeType) => {
    navigation.navigate("Recipe", { recipe: item });
  };

  const handleFABPressed = () => {
    navigation.navigate("NewRecipe");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#ececec" }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
      >
        <SegmentedButtons
          value={filter}
          onValueChange={(val) => setFilter(val)}
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
            titleStyle={{ fontWeight: "600" }}
            description={d.description}
            left={(props) => (
              <List.Icon {...props} icon="food" color={MD3Colors.primary50} />
            )}
            right={() => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton
                  icon={d.favorite ? "star" : "star-outline"}
                  onPress={() => toggleFavorite(d.id)}
                  size={20}
                />
                <IconButton
                  icon="trash-can-outline"
                  onPress={() => handleDelete(d.id)}
                  size={20}
                />
              </View>
            )}
          />
        ))}
        {filteredRecipes.length === 0 && (
          <Text variant="labelLarge" style={{ marginTop: 20 }}>
            Storage is currently empty :(
          </Text>
        )}
        <StatusBar style="auto" />
      </ScrollView>

      <MyFAB
        extended={isExtended}
        label={"New Recipe"}
        animateFrom={"right"}
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
