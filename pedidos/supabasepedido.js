const express = require('express');
const { supabase } = require('./supabaseclient');

const app = express();
app.use(express.json());

app.post('/api/agregar-pedido', async (req, res) => {
    const { id_pedido, fecha_pedido, precio_total, iva, direccion, id_usuario, id_tienda, id_despacho } = req.body;

    if (!id_pedido || !fecha_pedido || !precio_total || !iva || !direccion || !id_usuario || !id_tienda || !id_despacho) {
        return res.status(400).json({ error: 'Faltan campos requeridos en la solicitud' });
    }

    try {
        const { data, error } = await supabase
            .from('pedido')
            .insert([
                {
                    id_pedido,
                    fecha_pedido,
                    precio_total,
                    iva,
                    direccion,
                    id_usuario,
                    id_tienda,
                    id_despacho,
                },
            ])
            .select('*');

        if (error) {
            console.error('Error al insertar en Supabase:', JSON.stringify(error, null, 2));
            return res.status(400).json({ error: error.message, details: error.details, hint: error.hint });
        }

        // Datos de la notificación
        const notificacion = {
            id_notificacion: new Date().getTime(), // Genera un ID único
            id_usuario,
            mensaje: 'Nuevo pedido recibido',
            fecha: new Date().toISOString()
        };

        res.status(201).json({ message: 'Pedido agregado correctamente', pedido: data, notificacion });
    } catch (err) {
        console.error('Error interno del servidor:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
