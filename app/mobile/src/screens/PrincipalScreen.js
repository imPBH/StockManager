import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';


export default Principal = ({route}) => {
  const warehouse = route.params.warehouse;
  const company = route.params.company;

  function handleButtonPress(title) {
      console.log(`User pressed ${title}`);
  }

  return (
    <View style={styles.container}>
        <Text >{warehouse.name} in {company.name}</Text>
      <Text style={styles.textedisplay}>Choose an option</Text>
      <ButtonComponent title="Manage inventory" onPress={handleButtonPress} />
      <ButtonComponent title="New sale" onPress={handleButtonPress} />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textedisplay: {
    position: 'absolute',
    top: 70,
    fontSize: 30,
    fontWeight: 'bold',
  },
});


