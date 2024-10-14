import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Carrinho from '../components/Carrinho';
import { useCart } from '../context/CardContext';
import { StackNavigationProp } from '@react-navigation/stack';

// Definindo o tipo de navegação
type Props = {
  navigation: StackNavigationProp<any>;
};

const TelaCarrinho: React.FC<Props> = ({ navigation }) => {
  const { cartItems, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const deliveryFee = 9.00; // Valor fixo do frete

  const getSubTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotal = () => {
    return getSubTotal() + deliveryFee;
  };

  const handleCheckout = () => {
    Alert.alert("Obrigado por comprar com a gente!", "Volte sempre.");
    clearCart();
    navigation.navigate('TelaProdutos');
  };

  // Verifica se o número de itens no carrinho é 5 ou mais
  const hasFiveItems = cartItems.reduce((total, item) => total + item.quantity, 0) >= 5;

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <Carrinho
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {hasFiveItems && (
        <View style={styles.brindeCard}>
          <Image
            source={{ uri: 'https://lojareversa.com.br/wp-content/uploads/2024/08/pelucia-baphomet-preta-0_1-1-1.jpg' }}
            style={styles.brindeImage}
          />
          <Text style={styles.brindeText}>Aqui está o seu brinde!</Text>
        </View>
      )}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Sub total:</Text>
          <Text style={styles.summaryValue}>R$ {getSubTotal().toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Frete Fixo:</Text>
          <Text style={styles.summaryValue}>R$ {deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalValue}>R$ {getTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
          <Text style={styles.clearButtonText}>Limpar Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#888',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6bbd07',
  },
  clearButton: {
    backgroundColor: '#b5bab7',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: 'purple', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', 
  },
  brindeCard: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    width: '40%', 
    alignSelf: 'center', 
},
brindeText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
    textAlign:'center',
},
brindeImage: {
    width: 50,  
    height: 80, 
    borderRadius: 5,
},
});

export default TelaCarrinho;
