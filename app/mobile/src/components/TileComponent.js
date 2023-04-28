import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function TileComponent({ onPress, title }) {
  function handlePress() {
    onPress(title);
  }

  return (
    <TouchableOpacity
      key={title}
      onPress={() => handlePress(title)}
      style={styles.etpButton}
    >
      <View style={styles.etpTile}>
        <Text style={styles.text}>{title}</Text>
        <MaterialIcons name="chevron-right" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  etpButton: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  etpTile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
