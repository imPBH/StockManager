import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!username || !username.trim()) {
      alert("Veuillez saisir un nom d'utilisateur");
      return;
    }

    if (!password || !password.trim()) {
      alert("Veuillez saisir un mot de passe");
      return;
    }

    // Continue with login logic
    fetch('http://stockmanager.alexisprovo.fr/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then(response => {
      if (response.ok) {
        console.log("connected")
        navigation.navigate('CompanySelectionScreen', {user: username});
      } else {
        throw new Error('Invalid credentials')
      }
    })
    .catch(error => {
      console.error(error)
    })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page de connexion</Text>
      <TextInput placeholder="Nom d'utilisateur" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder="Mot de passe" secureTextEntry={true} style={styles.input} value={password} onChangeText={setPassword}/>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
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
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    marginTop: 20,
    color: '#2196F3',
  },
});

