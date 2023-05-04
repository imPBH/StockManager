import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function UpdateReferenceScreen({ route }) {
  const reference = route.params.scannedReference;
  const navigation = useNavigation();
  const [newName, setNewName] = useState(reference.name);
  const [newBarcode, setNewBarcode] = useState(reference.barcode_value);
  const [newPrice, setNewPrice] = useState(reference.price.toString());

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://stockmanager.alexisprovo.fr/api/reference/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: reference.id,
            barcode_value: newBarcode,
            name: newName,
            price: newPrice,
          }),
        }
      );
      const responseData = await response.json();
      console.log("Article mis à jour avec succès : ", responseData);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier l'article</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Nouveau nom :</Text>
        <TextInput
          style={styles.input}
          value={newName}
          onChangeText={setNewName}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nouveau code barre :</Text>
        <TextInput
          style={styles.input}
          value={newBarcode}
          onChangeText={setNewBarcode}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nouveau prix :</Text>
        <TextInput
          style={styles.input}
          value={newPrice}
          onChangeText={setNewPrice}
        />
      </View>
      <Button title="Mettre à jour" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    flex: 1,
    marginRight: 16,
    fontSize: 18,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 18,
  },
});
