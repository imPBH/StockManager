import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default ButtonComponent = ({title, onPress}) => {
    function handlePress() {
        onPress(title);
    }

    return (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(title)}>
        <Text style={[styles.buttonText, { textAlign: 'center' }]}>{title}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 10,
        width: '80%',
        aspectRatio: 4 / 1,
      },
      buttonText: {
        marginVertical: 15,
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
      }
});