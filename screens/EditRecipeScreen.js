import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, List, Text, TextInput } from "react-native-paper";
import { DynamicForm } from "../components/DynamicForm";
import { updateRecipe } from "../utils/storage";

export const EditRecipe = ({ route, navigation }) => {
  const { recipe, onUpdate } = route.params;

  const [showIngredients, setshowIngredients] = useState(false);
  const [showSteps, setshowSteps] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [image, setImage] = useState(recipe.image);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [steps, setSteps] = useState(recipe.steps);

  const scrollRef = useRef();

  const scrollToBottom = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert("Missing Title", "Please enter a title for your recipe.");
      return;
    }
    if (ingredients.length === 0 || steps.length === 0) {
      Alert.alert("A dish needs ingredients and steps to make it M8!");
      return;
    }
    const updatedRecipe = {
      ...recipe,
      title,
      description,
      image,
      ingredients,
      steps,
    };

    await updateRecipe(updatedRecipe);
    if (onUpdate) onUpdate(updatedRecipe);
    navigation.goBack();
  };

  const handleAddImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access camera roll is required!"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleShowIngredients = () => setshowIngredients(!showIngredients);
  const handleShowSteps = () => setshowSteps(!showSteps);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={20}
    >
      <SafeAreaView style={{ backgroundColor: "#ececec" }}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
          nestedScrollEnabled={true}
        >
          <View style={styles.headerRow}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Recipe Info
            </Text>
            <Button icon="food" mode="contained" onPress={handleUpdate}>
              Update Recipe
            </Button>
          </View>
          <TextInput
            label="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            mode="outlined"
            outlineColor="#ececec"
          />
          <TextInput
            label="Short Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            mode="outlined"
            style={{ marginTop: 8 }}
            multiline={true}
            outlineColor="#ececec"
          />
          <Button
            icon="image-plus"
            onPress={handleAddImage}
            style={styles.addButton}
          >
            Add Image
          </Button>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: 200,
                borderRadius: 8,
                marginTop: 8,
                marginBottom: 8,
              }}
            />
          )}
          <List.Accordion
            title="Ingredients"
            left={(props) => (
              <List.Icon {...props} icon="format-list-bulleted" />
            )}
            expanded={showIngredients}
            onPress={handleShowIngredients}
            containerStyle={{ backgroundColor: "#ececec" }}
            style={{ backgroundColor: "#ececec" }}
          >
            <DynamicForm
              items={ingredients}
              setItems={setIngredients}
              label="Ingredient"
              scrollToBottom={scrollToBottom}
            />
          </List.Accordion>
          <List.Accordion
            title="Steps"
            left={(props) => (
              <List.Icon {...props} icon="format-list-numbered" />
            )}
            expanded={showSteps}
            onPress={handleShowSteps}
            containerStyle={{ backgroundColor: "#ececec" }}
            style={{ backgroundColor: "#ececec" }}
          >
            <DynamicForm
              items={steps}
              setItems={setSteps}
              label="Step"
              scrollToBottom={scrollToBottom}
            />
          </List.Accordion>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 100,
    minHeight: "100%",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  addButton: {
    marginTop: 8,
  },
});
