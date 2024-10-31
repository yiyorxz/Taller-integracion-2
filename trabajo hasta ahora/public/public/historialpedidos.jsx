import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const OrderHistoryScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([]);

    // Llamada para obtener los pedidos
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/pedidos/:id/historial'); // Cambia la URL según sea necesario
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || 'Error al obtener los pedidos');
            }
    
            // Asegúrate de ajustar esta parte según la estructura de tu API
            setOrders(data.historial); // Cambia esto si tu API devuelve los pedidos de otra forma
        } catch (error) {
            console.error('Error al obtener el historial de pedidos:', error);
        }
    };
    

    // Renderizar cada pedido en la lista
    const renderOrderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.orderItem}
            onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })} // Navegar a la pantalla de detalle
        >
            <Text>Fecha: {item.date}</Text>
            <Text>Total: ${item.total}</Text>
            <Text>Estado: {item.status}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Pedidos</Text>
            <FlatList 
                data={orders}
                renderItem={renderOrderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    orderItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});

export default OrderHistoryScreen;
