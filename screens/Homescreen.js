import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { Button, IconButton, List, SegmentedButtons } from "react-native-paper";
import { MyFAB } from "../components/AnimatedFAB";
import { NewRecipe } from "../components/NewRecipe";
import { clearRecipes, getRecipes, updateRecipe } from "../utils/storage";

const screenHeight = Dimensions.get("window").height;

export default function Homescreen() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isExtended, setIsExtended] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRecipeVisible, setIsRecipeVisible] = useState(false);
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

  const handleSave = async () => {
    console.log("Handle Save Shit");
    await loadRecipes();
    toggleModal();
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleRecipe = () => {
    setIsRecipeVisible(!isRecipeVisible);
  };

  const handleItemPressed = (item) => {
    console.log("Item:", item.title);
    navigation.navigate("Recipe", { recipe: item });
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
        <Button onPress={clearAll}>Remove all recipes</Button>
        <StatusBar style="auto" />
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        propagateSwipe
      >
        <View style={styles.sheetContent}>
          <NewRecipe handleSave={handleSave} />
        </View>
      </Modal>

      <MyFAB
        extended={isExtended}
        label={"New Recipe"}
        animateFrom={16}
        visible={true}
        style={{ paddingRight: 10 }}
        onPress={toggleModal}
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
