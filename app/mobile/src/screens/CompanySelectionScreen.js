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
import { useNavigation } from '@react-navigation/native';

export default function CompanySelectionScreen({ route }) {
  const navigation = useNavigation();
  const companies = [
    "Amazon",
    "Apple",
    "Facebook",
    "Google",
    "Microsoft",
    "Netflix",
    "Twitter",
    "Uber",
    "Yahoo",
  ];
  const handleCompanySelection = (company) => {
    console.log(`User selected ${company}`);
    navigation.navigate("WarehouseSelectionScreen", { company });
  };

  const username = route.params.user;

  const TilesCompanies = companies.map((company) => (
    <TileComponent key={company} title={company} onPress={handleCompanySelection} />
    ));

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>StockManager!</Text>
          <Text style={styles.subtitle}>Welcome {username}</Text>
          <Text style={styles.subtitle}>Select your company</Text>
          <View style={styles.etpContainer}>
            {TilesCompanies}
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
