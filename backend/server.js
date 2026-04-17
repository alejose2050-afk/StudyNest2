const express = require('express');
const cors = require('cors');
const app = express();

// Configuraciones esenciales
app.use(cors()); // Permiso para que el navegador entre
app.use(express.json()); // Permiso para leer datos JSON

// La ruta que recibirá tu nombre
app.post('/api/nombre', (req, res) => {
    console.log("¡Dato recibido en el servidor!", req.body);
    const nombreRecibido = req.body.nombre;

    res.json({
        mensaje: "¡Conexión exitosa desde el Backend!",
        tuNombre: nombreRecibido
    });
});

// Usaremos el puerto 5000 para evitar bloqueos del 3000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log("Presiona Ctrl + C para detenerlo");
});