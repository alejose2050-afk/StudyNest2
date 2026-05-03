// 1. Importar las librerías
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// 2. Definir la variable 'app' (Esto es lo que te faltaba)
const app = express();

// 3. Configurar middlewares
app.use(cors()); 
app.use(express.json()); 

// 4. Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      
    database: 'studynest_db'
});

db.connect(err => {
    if (err) {
        console.error("❌ Error conectando a la DB:", err.message);
        return;
    }
    console.log("✅ Conectado a la base de datos MySQL de StudyNest");
});

// 5. La ruta de registro (Ahora 'app' ya existe)
app.post('/api/registro', (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ mensaje: "Faltan datos en el formulario." });
    }

    const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
    db.query(query, [nombre, email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ mensaje: "Error al guardar en DB: " + err.message });
        }
        res.status(200).json({ 
            mensaje: "¡Registro exitoso en StudyNest!", 
            usuario: { nombre, email } 
        });
    });
});

// RUTA DE LOGIN
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ mensaje: "Error en el servidor" });

        if (results.length > 0) {
            // Si encontró al usuario
            res.status(200).json({
                mensaje: "Login exitoso",
                usuario: { nombre: results[0].nombre, email: results[0].email }
            });
        } else {
            // Si los datos no coinciden
            res.status(401).json({ mensaje: "Correo o contraseña incorrectos" });
        }
    });
});

// 6. Encender el servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor de StudyNest encendido en el puerto ${PORT}`);
});