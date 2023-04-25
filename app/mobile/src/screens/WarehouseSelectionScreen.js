import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import TileComponent from "../components/TileComponent";

export default function WarehouseSelectionScreen({ route }) {
  const warehouses = [
    "Warehouse 1",
    "Warehouse 2",
    "Warehouse 3",
    "Warehouse 4",
    "Warehouse 5",
    "Warehouse 6",
    "Warehouse 7"
  ];
  const handleWarehouseSelection = (warehouse) => {
    console.log(`User selected ${warehouse}`);
  };

  const TilesWarehouses = warehouses.map((warehouse) => (
    <TileComponent key={warehouse} title={warehouse} onPress={handleWarehouseSelection} />
    ));

  const company = route.params.company;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>{company}</Text>
          <Text style={styles.subtitle}>Select your warehouse</Text>
          <View style={styles.etpContainer}>
            {TilesWarehouses}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 20,
  },
  etpContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
  },
});
