const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// --- CONFIGURACIÓN ---
app.use(cors()); // Permite que tu frontend se conecte
app.use(express.json()); // Permite leer los datos JSON que envías

// Conexión a MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '', // Cambia si tienes contraseña
    database: 'studynest_db'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a MySQL:', err.message);
        return;
    }
    console.log('✅ Conectado a la base de datos MySQL de StudyNest');
});

// --- RUTA 1: REGISTRO ---
app.post('/api/registro', (req, res) => {
    const { nombre, email, password } = req.body;
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("******************************************");
    console.log(`📩 NUEVO REGISTRO: ${email}`);
    console.log(`🔑 CÓDIGO DE VERIFICACIÓN: ${codigo}`);
    console.log("******************************************");

    const query = 'INSERT INTO usuarios (nombre, email, password, codigo_verificacion) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, email, password, codigo], (err, result) => {
        if (err) {
            console.error("❌ Error en DB:", err.message);
            return res.status(500).json({ mensaje: "Error al registrar usuario" });
        }
        res.status(200).json({ mensaje: "Código generado con éxito" });
    });
});

// --- RUTA 2: VERIFICACIÓN ---
app.post('/api/verificar', (req, res) => {
    const { email, codigo } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ? AND codigo_verificacion = ?';

    db.query(query, [email, codigo], (err, results) => {
        if (results.length > 0) {
            db.query('UPDATE usuarios SET verificado = true WHERE email = ?', [email]);
            res.status(200).json({ mensaje: "Cuenta verificada con éxito" });
        } else {
            res.status(401).json({ mensaje: "Código incorrecto" });
        }
    });
});

// --- RUTA 3: LOGIN ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT id, nombre, verificado FROM usuarios WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ mensaje: "Error en el servidor" });
        
        if (results.length > 0) {
            if (!results[0].verificado) {
                return res.status(403).json({ mensaje: "Por favor, verifica tu cuenta primero" });
            }
            res.status(200).json({ mensaje: "Login exitoso", usuario: results[0] });
        } else {
            res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }
    });
});

app.listen(5000, '0.0.0.0', () => {
    console.log("🚀 Servidor de StudyNest encendido en el puerto 5000");
});