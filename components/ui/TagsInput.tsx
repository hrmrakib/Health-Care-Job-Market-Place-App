import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface TagsInputProps {
  label?: string;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  suggestedTags?: string[];
}

const TagsInput = ({
  label,
  tags,
  onAddTag,
  onRemoveTag,
  placeholder = "Type and press Enter",
  containerStyle,
  suggestedTags = [],
}: TagsInputProps) => {
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onAddTag(trimmed);
      setInputValue("");
    }
  };

  const handleAddSuggested = (tag: string) => {
    if (!tags.includes(tag)) {
      onAddTag(tag);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.title }]}>{label}</Text>
      )}

      <View
        style={[
          styles.inputContainer,
          styles.inputShadow,
          { backgroundColor: theme.surface },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { color: theme.text, backgroundColor: theme.navBackground },
          ]}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder={placeholder}
          placeholderTextColor={theme.iconColor}
          onSubmitEditing={handleAddTag}
          returnKeyType="done"
        />

        {suggestedTags.length > 0 && tags.length === 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestedTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.suggestedTag,
                  { borderColor: theme.border },
                ]}
                onPress={() => handleAddSuggested(tag)}
              >
                <Text style={[styles.suggestedTagText, { color: theme.text }]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.tagsContainer}>
          {tags.map((tag) => (
            <View
              key={tag}
              style={[
                styles.tag,
                { backgroundColor: theme.primary },
              ]}
            >
              <Text style={styles.tagText}>{tag}</Text>
              <TouchableOpacity onPress={() => onRemoveTag(tag)}>
                <Ionicons name="close" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
          {/* Display suggestions when some tags are already selected, filtering out chosen ones */}
          {suggestedTags.filter(t => !tags.includes(t)).map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.suggestedTag,
                { borderColor: theme.border },
              ]}
              onPress={() => handleAddSuggested(tag)}
            >
              <Text style={[styles.suggestedTagText, { color: theme.text }]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default TagsInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    borderRadius: 10,
    padding: 15,
  },
  inputShadow: {
    shadowColor: "#0000008b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  input: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 12,
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 4,
  },
  tagText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  suggestedTag: {
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  suggestedTagText: {
    fontSize: 14,
  },
});
