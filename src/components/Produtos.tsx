import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ProdutoProps {
    id: number;
    name: string;
    price: number;
    image: string;
    onCarrinho: () => void;
}

const Produto: React.FC<ProdutoProps> = ({name, price, image, onCarrinho }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onCarrinho}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>Preço: R$ {price.toFixed(2)}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '48%', 
        margin: '1%', 
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
    },
    name: {
        textAlign:'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    price: {
        fontSize: 14,
        color: '#555',
    },
});

export default Produto;
