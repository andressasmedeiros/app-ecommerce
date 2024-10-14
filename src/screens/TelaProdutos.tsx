import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, Image, StyleSheet, Modal, RefreshControl } from 'react-native';
import Produto from '../components/Produtos';
import { useCart } from '../context/CardContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

// Definindo o tipo das rotas
type RootStackParamList = {
    Produtos: undefined; 
    TelaCarrinho: undefined; 
};

type TelaProdutoNavigationProp = StackNavigationProp<RootStackParamList, 'Produtos'>;

const TelaProduto: React.FC = () => {
    const navigation = useNavigation<TelaProdutoNavigationProp>();
    const [products, setProducts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { cartItems, addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<any>(null); 
    const [quantity, setQuantity] = useState(1); 
    const [isModalVisible, setModalVisible] = useState(false); 
    const [isRefreshing, setIsRefreshing] = useState(false); 

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await fetch('http://192.168.16.105:3000/produtos');
        const data = await response.json();
        setProducts(data);
        setIsRefreshing(false); 
    };

    const onRefresh = () => {
        setIsRefreshing(true); 
        fetchProducts(); 
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddToCart = () => {
        if (selectedProduct) {
            addToCart(selectedProduct, quantity); 
            setModalVisible(false); 
            setQuantity(1); 
        }
    };

    const openModal = (product: any) => {
        setSelectedProduct(product);
        setModalVisible(true); 
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TextInput
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    style={styles.searchInput}
                />
                <TouchableOpacity onPress={() => navigation.navigate('TelaCarrinho')}>
    <Icon name="shopping-bag" size={24} color="#000" />
    {cartItems.length > 0 && (
        <View style={styles.cartItemCountContainer}>
            <Text style={styles.cartItemCountText}>{cartItems.length}</Text>
        </View>
    )}
</TouchableOpacity>


            </View>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.promoCard}>
                    <Image
                        source={require('../../assets/brinde.png')} 
                        style={styles.promoImage}
                    />
                </View>

                
                <View style={styles.productsContainer}>
                    {filteredProducts.map((product) => (
                        <Produto
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            onCarrinho={() => openModal(product)} 
                        />
                    ))}
                </View>
            </ScrollView>

           
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecione a Quantidade</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                                <Text style={styles.quantityButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                                <Text style={styles.quantityButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                            <Text style={styles.addButtonText}>Adicionar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    promoCard: {
        alignItems: 'center',
        marginBottom: 10,
    },
    promoImage: {
        width: '100%',
        height: 200, 
        borderRadius: 10,
        resizeMode: 'cover', 
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    quantityButton: {
        fontSize: 24,
        marginHorizontal: 10,
    },
    quantityText: {
        fontSize: 18,
    },
    addButton: {
        backgroundColor: 'purple',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: 'white',
    },
    cartItemCountContainer: {
        position: 'absolute',
        right: -5,
        top: -2, 
        width: 16, 
        height: 16, 
        borderRadius: 8, 
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartItemCountText: {
        color: '#8A2BE2', 
        fontSize: 12, 
        fontWeight: 'bold',
    },
});

export default TelaProduto;
