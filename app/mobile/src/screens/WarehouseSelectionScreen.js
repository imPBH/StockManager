import React, {useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";
import TileComponent from "../components/TileComponent";
import { useNavigation } from '@react-navigation/native';

export default function WarehouseSelectionScreen({ route }) {
  const [warehouses, setWarehouses] = useState([]);
  const navigation = useNavigation();
  const company = route.params.company;

  const handleWarehouseSelection = (warehouse) => {
    console.log(`User selected ${warehouse.name} id ${warehouse.id}`);
    navigation.navigate("PrincipalScreen", { warehouse , company });
  };

  useEffect(() => {
    fetch(`http://stockmanager.alexisprovo.fr/api/warehouses/get?companyId=${company.id}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => setWarehouses(data))
  })

  const TilesWarehouses = warehouses.map((warehouse) => (
    <TileComponent key={warehouse.id} title={warehouse.name} onPress={() => handleWarehouseSelection(warehouse)} />
    ));

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>{company.name}</Text>
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
