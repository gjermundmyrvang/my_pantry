import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  IconButton,
  List,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

type DynamicFormProps = {
  items: string[];
  setItems: (items: string[]) => void;
  label?: string;
  scrollToBottom?: () => void;
};

export const DynamicForm = ({
  items,
  setItems,
  label = "Item",
  scrollToBottom,
}: DynamicFormProps) => {
  const [currentInput, setCurrentInput] = useState("");
  const { colors } = useTheme();
  const inputRef = useRef<any>(null);

  const handleAdd = () => {
    if (currentInput.trim() === "") return;

    setItems([...items, currentInput.trim()]);
    setCurrentInput("");

    scrollToBottom?.();

    setTimeout(() => {
      inputRef.current?.focus?.();
    }, 100);
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <View style={styles.wrapper}>
      {items.map((item, index) => (
        <List.Item
          key={`${index}-${item}`}
          title={item}
          right={() => (
            <IconButton
              icon="delete"
              onPress={() => removeItem(index)}
              size={20}
            />
          )}
        />
      ))}
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRef}
          value={currentInput}
          onChangeText={setCurrentInput}
          placeholder={`Enter ${label}`}
          mode="outlined"
          returnKeyType="done"
          outlineColor={colors.secondary}
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
});
