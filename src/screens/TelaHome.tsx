import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Definindo o tipo das rotas
type RootStackParamList = {
    Home: undefined; 
    TelaProdutos: undefined; 
};

type TelaHomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const TelaHome: React.FC = () => {
    const navigation = useNavigation<TelaHomeNavigationProp>();
    const scale = useRef(new Animated.Value(0)).current; 
    const opacity = useRef(new Animated.Value(0)).current; 

    useEffect(() => {
        // Inicia a animação de aumento
        Animated.timing(scale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        });
    }, [scale, opacity]);

    const handlePress = () => {
        navigation.navigate('TelaProdutos');
    };

    return (
        <ImageBackground
            source={require('../../assets/FUNDO.jpg')}
            style={styles.backgroundImage}
        >
            {/* Camada de transparência lilás que ocupa toda a tela */}
            <Animated.View style={[styles.transparentOverlay, { opacity: 0.5 }]} />
            <View style={styles.overlay}>
                <View style={styles.imageContainer}>
                    <Animated.View style={{ transform: [{ scale }] }}>
                        <Image
                            source={require('../../assets/caldeirao.png')} 
                            style={styles.image}
                        />
                    </Animated.View>
                </View>
                <View style={styles.bottomContainer}>
                    <Animated.View style={{ opacity }}>
                        <TouchableOpacity style={styles.enterButton} onPress={handlePress}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transparentOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(186, 85, 211, 0.6)',
        zIndex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
    bottomContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30, 
    },
    magicText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginVertical: 10,
    },
    enterButton: {
        backgroundColor: '#8A2BE2',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    imageContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginVertical: 10,
    },
    image: {
        width: 350,
        height: 600,
        resizeMode: 'contain',
    },
});

export default TelaHome;
