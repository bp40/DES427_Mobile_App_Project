
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Login from './src/login';
import LocationPage from './src/locationPage';
import DeliveryNot from './src/deliveryNot';
import DeliveryYes from './src/deliveryYes';
import SignUp from "./src/signup";
import CheckOut from "./src/checkout";
import RestaurantBrowsePage from "./src/restaurant";
import MenuPage from "./src/MenuPage";
import CartPage from "./src/CartPage";



function BackButton() {
  const navigation = useNavigation();
  return (
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
            source={require('./assets/back.png')} // For local image
            style={{ width: 25, height: 25,  marginLeft: 10}}
        />
      </TouchableOpacity>
  );
}

const Stack = createStackNavigator();

export default function App()  {
  return (

      <NavigationContainer >
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerTitle: '' ,headerLeft: () => null }}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerTitle: '' , headerTintColor: '#FC0505'}} />
          <Stack.Screen name="Location" component={LocationPage} options={{ headerLeft: () => null, headerTitleStyle: { fontWeight: 'bold' } }}/>
            <Stack.Screen name="Restaurant" component={RestaurantBrowsePage} options={{ headerLeft: () => null, headerTitleStyle: { fontWeight: 'bold' } }}/>
            <Stack.Screen
                name="Menu"
                component={MenuPage} // Where the menu for a selected restaurant is shown
                options={{
                    headerLeft: () => null,
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <Stack.Screen name="Cart" component={CartPage} options={{ headerTitle: 'Cart', headerTitleStyle: { fontWeight: 'bold' } ,headerLeft: () => null }}/>
          <Stack.Screen name="DeliveryNot" component={DeliveryNot} options={{ headerTitle: 'Delivery', headerTitleStyle: { fontWeight: 'bold' } ,headerLeft: () => null }}/>
          <Stack.Screen name="DeliveryYes" component={DeliveryYes} options={{ headerTitle: 'Delivery', headerTitleStyle: { fontWeight: 'bold' } ,headerLeft: () => null }}/>
          <Stack.Screen name="CheckOut" component={CheckOut} options={{ headerTitle: 'Checkout Cart', headerTitleStyle: { fontWeight: 'bold' } ,headerLeft: () => <BackButton/>}} />
        </Stack.Navigator>
      </NavigationContainer>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 70,
  },
});
