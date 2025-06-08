import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, IconButton, Text, TextInput } from "react-native-paper";

export const DynamicForm = ({ items, setItems, label = "Item" }) => {
  const [currentInput, setCurrentInput] = useState("");

  const handleAdd = () => {
    if (currentInput.trim() === "") return;
    setItems([...items, currentInput.trim()]);
    setCurrentInput("");
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <View style={styles.wrapper}>
      {items.map((item, index) => (
        <View key={`${index}-${item}`} style={styles.itemRow}>
          <Text style={styles.itemText}>{item}</Text>
          <IconButton
            icon="delete"
            onPress={() => removeItem(index)}
            size={20}
            style={styles.deleteButton}
          />
        </View>
      ))}
      {items.length > 0 && <Divider style={{ marginVertical: 8 }} />}

      <View style={styles.inputRow}>
        <TextInput
          value={currentInput}
          onChangeText={setCurrentInput}
          placeholder={`Enter ${label}`}
          mode="outlined"
          returnKeyType="done"
          onSubmitEditing={handleAdd}
          style={styles.input}
          right={
            <TextInput.Icon
              icon="plus"
              onPress={handleAdd}
              forceTextInputFocus={false}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
  },
  deleteButton: {
    marginLeft: 4,
  },
  addButton: {
    marginTop: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    gap: 4,
  },

  itemText: {
    flex: 1,
    flexWrap: "wrap",
  },

  iconButton: {
    alignSelf: "center",
    padding: 0,
    margin: 0,
  },
});
