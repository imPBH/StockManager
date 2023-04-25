import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import CompanySelectionScreen from '../screens/CompanySelectionScreen.js';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Connexion" component={LoginScreen} />
      <Stack.Screen name="CompanySelectionScreen" component={CompanySelectionScreen} />
    </Stack.Navigator>
  );
}