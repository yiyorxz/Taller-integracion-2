import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderDetailScreen = ({ route }) => {
    const { orderId } = route.params;
    const [orderDetail, setOrderDetail] = useState(null);

    // Llamada para obtener el detalle del pedido
    useEffect(() => {
        fetchOrderDetail(orderId);
    }, [orderId]);

    const fetchOrderDetail = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/pedidos/${orderId}`); // Cambia la URL según sea necesario
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || 'Error al obtener los detalles del pedido');
            }
            setOrderDetail(data.pedido); // Cambia 'data.pedido' según la respuesta de tu API
        } catch (error) {
            console.error('Error al obtener los detalles del pedido:', error);
        }
    };
    

    if (!orderDetail) {
        return <Text>Cargando...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalle del Pedido</Text>
            <Text>Fecha: {orderDetail.date}</Text>
            <Text>Estado: {orderDetail.status}</Text>
            
            <Text style={styles.subtitle}>Artículos:</Text>
            {orderDetail.items.map((item, index) => (
                <View key={index} style={styles.item}>
                    <Text>{item.name} - Cantidad: {item.quantity} - Precio: ${item.price}</Text>
                </View>
            ))}
            
            <Text style={styles.total}>Total: ${orderDetail.total}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    subtitle: { fontSize: 20, fontWeight: 'bold', marginTop: 16 },
    item: { paddingVertical: 8 },
    total: { fontSize: 18, fontWeight: 'bold', marginTop: 16 },
});

export default OrderDetailScreen;
