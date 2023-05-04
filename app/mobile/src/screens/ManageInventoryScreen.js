import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';


export default function ScannerScreenAdd({route}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [references, setReferences] = useState([]);
  const warehouse = route.params.warehouse;
  const company = route.params.company;
  const navigation = useNavigation();


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      const response = await fetch(`http://stockmanager.alexisprovo.fr/api/reference/get?companyId=${company.id}`);
      const referencesData = await response.json();
      const scannedReference = referencesData.find(reference => reference.barcode_value === data);
      if (scannedReference) {
        console.log(`Le code barre ${data} correspond à la référence ${scannedReference.name}`);
        navigation.navigate('NewArticleScreen', { scannedReference , warehouse });
      } else {
        console.log(`Le code barre ${data} n'a pas été trouvé dans les références`);
        navigation.navigate('NewReferenceScreen', { data , company });
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  if (hasPermission === null) {
    return <Text>Demande de permission pour utiliser la caméra</Text>;
  }
  if (hasPermission === false) {
    return <Text>Pas d'accès à la caméra</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Scanner à nouveau'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
  });