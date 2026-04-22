const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json()); 

// NUEVA RUTA: Registro de usuarios
app.post('/api/registro', (req, res) => {
    console.log("\n--- NUEVO INTENTO DE REGISTRO ---");
    console.log("Datos recibidos:", req.body);
    
    const { nombre, email, password } = req.body;

    // Validación de seguridad en el Backend
    if (!nombre || !email || !password) {
        console.log("❌ Registro fallido: Faltan datos.");
        return res.status(400).json({
            mensaje: "Datos incompletos. Revisa el formulario."
        });
    }

    // Si todo está bien, simulamos el guardado
    console.log(`✅ Usuario ${nombre} validado correctamente.`);

    res.status(200).json({
        mensaje: "¡Registro exitoso en StudyNest!",
        usuario: {
            nombre: nombre,
            email: email
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend de StudyNest encendido en el puerto ${PORT}`);
    console.log("Esperando conexiones...");
});