import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewArticleScreen({ route }) {
  const [expiration, setExpiration] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const idReference = route.params.scannedReference.id;
  const idWarehouse = route.params.warehouse.id;
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      console.log(idReference)
      console.log(idWarehouse)
      const response = await fetch('http://stockmanager.alexisprovo.fr/api/article/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_reference: idReference,
            id_warehouse: idWarehouse,
            expiration: expiration
        })
      });
      const responseData = await response.json();
      console.log('Nouvel article créé avec succès : ', responseData);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpirationChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setExpiration(selectedDate);
  };

  const handleShowDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleHideDatePicker = () => {
    setShowDatePicker(false);
    setExpiration(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un nouvel article</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Date d'expiration :</Text>
        <Button
          title={expiration ? expiration.toISOString().substr(0, 10) : "Aucune date"}
          onPress={handleShowDatePicker}
        />
        {showDatePicker && (
          <DateTimePicker
            value={expiration || new Date()}
            mode="date"
            display="default"
            onChange={handleExpirationChange}
          />
        )}
        {expiration && (
          <Button
            title="Effacer"
            onPress={handleHideDatePicker}
          />
        )}
      </View>
      <Button
        title="Créer"
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    flex: 1,
    marginRight: 16,
    fontSize: 18,
  },
});
