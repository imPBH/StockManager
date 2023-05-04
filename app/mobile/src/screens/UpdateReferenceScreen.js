import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function UpdateReferenceScreen({ route }) {
  const reference = route.params.scannedReference;
  const warehouse = route.params.warehouse;
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

  const handleDelete = async () => {
    try {
      const response = await fetch(
        "http://stockmanager.alexisprovo.fr/api/reference/delete",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyId: warehouse.id_Company,
            referenceId: reference.id,
          }),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log("Article supprimé avec succès : ", responseData);
        navigation.goBack();
      } else {
        throw new Error("La suppression de l'article a échoué");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const showAlert = () => {
    Alert.alert(
      "Supprimer l'article",
      "Êtes-vous sûr de vouloir supprimer cet article ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", onPress: handleDelete, style: "destructive" },
      ],
      { cancelable: false }
    );
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
      <Button title="Supprimer" onPress={showAlert} />
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
