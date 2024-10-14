import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { CartProvider } from './src/context/CardContext';
import TelaProdutos from './src/screens/TelaProdutos';
import TelaCarrinho from './src/screens/TelaCarrinho'; 
import TelaHome from './src/screens/TelaHome';

const Stack = createNativeStackNavigator(); 

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="TelaHome" component={TelaHome} options={{ title: 'Bem vindo(a)' }}/>
  <Stack.Screen name="TelaProdutos" component={TelaProdutos} options={{ title: 'Nossos Produtos' }}/>
  <Stack.Screen name="TelaCarrinho" component={TelaCarrinho} options={{ title: 'Seu Carrinho' }}/>
</Stack.Navigator>

      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
