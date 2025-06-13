import React, { useRef, useState } from "react";
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
import { Button, List, Text, TextInput, useTheme } from "react-native-paper";
import { DynamicForm } from "./DynamicForm";
import * as ImagePicker from "expo-image-picker";
import { RecipeType } from "../types/Recipe";

type RecipeFormProps = {
  initial?: Partial<RecipeType>;
  onSubmit: (recipe: RecipeType) => Promise<void> | void;
  submitLabel?: string;
};

export const RecipeForm: React.FC<RecipeFormProps> = ({
  initial = {},
  onSubmit,
  submitLabel = "Save Recipe",
}) => {
  const [showIngredients, setShowIngredients] = useState(true);
  const [showSteps, setShowSteps] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [title, setTitle] = useState(initial.title ?? "");
  const [description, setDescription] = useState(initial.description ?? "");
  const [image, setImage] = useState<string | undefined>(initial.image);
  const [ingredients, setIngredients] = useState<string[]>(
    initial.ingredients ?? []
  );
  const [steps, setSteps] = useState<string[]>(initial.steps ?? []);

  const { colors } = useTheme();
  const scrollRef = useRef<ScrollView | null>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const handleOnSave = async () => {
    if (!title.trim()) {
      Alert.alert("Missing Title", "Please enter a title for your recipe.");
      return;
    }
    if (ingredients.length === 0 || steps.length === 0) {
      Alert.alert("A dish needs ingredients and steps to make it M8!");
      return;
    }
    const recipe: RecipeType = {
      id: initial.id ?? Date.now().toLocaleString(),
      title,
      description,
      ingredients,
      steps,
      favorite: initial.favorite ?? false,
      image: image ?? undefined,
    };

    await onSubmit(recipe);
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
      mediaTypes: ["images"],
      quality: 0.7,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleShowIngredients = () => setShowIngredients((v) => !v);
  const handleShowSteps = () => setShowSteps((v) => !v);
  const handleShowImage = () => setShowImage((v) => !v);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ backgroundColor: colors.background }}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
        >
          <View style={styles.headerRow}>
            <Text variant="titleMedium">Recipe Info</Text>
            <Button icon="food" mode="contained" onPress={handleOnSave}>
              {submitLabel}
            </Button>
          </View>
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            outlineColor={colors.secondary}
          />
          <TextInput
            label="Short Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            style={{ marginTop: 8 }}
            multiline={true}
            outlineColor={colors.secondary}
          />
          <Button
            icon="image-plus"
            onPress={handleAddImage}
            style={{ marginVertical: 10, backgroundColor: colors.secondary }}
            textColor={colors.onSurface}
          >
            Add Image
          </Button>
          {image && (
            <List.Accordion
              title="Image"
              left={(props) => <List.Icon {...props} icon="camera-image" />}
              expanded={showImage}
              onPress={handleShowImage}
              style={{
                backgroundColor: colors.secondary,
                borderRadius: 18,
                marginVertical: 5,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 8,
                  marginVertical: 10,
                  paddingLeft: 0,
                }}
              />
            </List.Accordion>
          )}
          <List.Accordion
            title="Ingredients"
            left={(props) => (
              <List.Icon {...props} icon="format-list-bulleted" />
            )}
            expanded={showIngredients}
            onPress={handleShowIngredients}
            style={{
              backgroundColor: colors.secondary,
              borderRadius: 18,
              marginVertical: 5,
            }}
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
            style={{
              backgroundColor: colors.secondary,
              borderRadius: 18,
              marginVertical: 5,
            }}
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
});
