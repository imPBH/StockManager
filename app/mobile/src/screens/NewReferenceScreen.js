import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function NewReferenceScreen({ route }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const barcode = route.params.data;
  const companyId = route.params.company.id;
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
        console.log(barcode)
      const response = await fetch('http://stockmanager.alexisprovo.fr/api/reference/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reference: {
                barcode_value: barcode,
                name: name,
                price: price
            },
            companyId: companyId
        })
      });
      const responseData = await response.json();
      console.log('Nouvelle référence créée avec succès : ', responseData);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePriceChange = (text) => {
    setPrice(text);
  };

  const handlePriceBlur = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une nouvelle référence</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.priceInputContainer}>
        <TextInput
          style={styles.priceInput}
          placeholder="Prix"
          value={price}
          onChangeText={handlePriceChange}
          keyboardType='numeric'
        />
      </View>
      <Button
        title="Créer"
        disabled={!name || !price}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 18,
    padding: 8,
    marginBottom: 16,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 18,
    padding: 8,
    flex: 1,
    marginRight: 8,
  },
});