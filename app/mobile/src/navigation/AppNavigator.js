import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import CompanySelectionScreen from '../screens/CompanySelectionScreen.js';
import WarehouseSelectionScreen from '../screens/WarehouseSelectionScreen';
import PrincipalScreen from '../screens/PrincipalScreen.js';
import ManageInventoryScreen from '../screens/ManageInventoryScreen';
import SaleScreen from '../screens/SaleScreen.js';
import NewReferenceScreen from '../screens/NewReferenceScreen';
import NewArticleScreen from '../screens/NewArticleScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Connexion" component={LoginScreen} />
      <Stack.Screen name="CompanySelectionScreen" component={CompanySelectionScreen} />
      <Stack.Screen name="WarehouseSelectionScreen" component={WarehouseSelectionScreen} />
      <Stack.Screen name="PrincipalScreen" component={PrincipalScreen} />
      <Stack.Screen name="ManageInventoryScreen" component={ManageInventoryScreen} />
      <Stack.Screen name="SaleScreen" component={SaleScreen} />
      <Stack.Screen name="NewReferenceScreen" component={NewReferenceScreen} />
      <Stack.Screen name="NewArticleScreen" component={NewArticleScreen} />
    </Stack.Navigator>
  );
}

