const API_URL = 'http://127.0.0.1:5000/api';

// 1. REGISTRO
async function enviarDatos() {
    const nombreInput = document.getElementById('nombreInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const cajarespuesta = document.getElementById('respuesta');

    if (!nombreInput || !emailInput || !passwordInput) return;

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!nombre || !email || !password) {
        cajarespuesta.innerText = "⚠️ Llena todos los campos";
        return;
    }

    cajarespuesta.innerText = "Registrando...";

    try {
        const response = await fetch(`${API_URL}/registro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, password })
        });

        if (response.ok) {
            // Cambio dinámico de interfaz para verificar código
            document.querySelector('.box').innerHTML = `
                <h1>Verifica tu Cuenta</h1>
                <p>Ingresa el código que aparece en la terminal de Node.js</p>
                <input type="text" id="codigoVerificacion" placeholder="000000" maxlength="6">
                <button onclick="confirmarCodigo('${email}')">Verificar</button>
                <div id="resVerificar"></div>
            `;
        } else {
            cajarespuesta.innerText = "❌ Error al registrar";
        }
    } catch (error) {
        console.error(error);
        cajarespuesta.innerText = "❌ Error: Sin conexión con el servidor";
    }
}

// 2. VERIFICACIÓN
async function confirmarCodigo(email) {
    const codigo = document.getElementById('codigoVerificacion').value;
    const res = document.getElementById('resVerificar');

    try {
        const response = await fetch(`${API_URL}/verificar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, codigo })
        });

        if (response.ok) {
            document.querySelector('.box').innerHTML = `
                <h1>✅ Verificado</h1>
                <p>Ya puedes iniciar sesión.</p>
                <button onclick="window.location.href='login.html'">Ir al Login</button>
            `;
        } else {
            res.innerText = "❌ Código incorrecto";
        }
    } catch (error) {
        res.innerText = "❌ Error de conexión";
    }
}

// 3. LOGIN
// 3. LOGIN
async function iniciarSesion() {
    // Estos IDs deben ser iguales a los del HTML arriba
    const emailInput = document.getElementById('emailLogin');
    const passwordInput = document.getElementById('passwordLogin');
    const cajarespuesta = document.getElementById('respuestaLogin');

    if (!emailInput || !passwordInput) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        cajarespuesta.innerText = "⚠️ Completa los datos";
        return;
    }

    cajarespuesta.innerText = "Validando...";

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Guardamos los datos reales que vienen de tu MySQL 
            localStorage.setItem('usuarioNombre', data.usuario.nombre);
            localStorage.setItem('usuarioId', data.usuario.id);
            
            // Redirección limpia
            window.location.href = "dashboard.html";
        } else {
            // Mostramos el mensaje de error que viene de tu backend (Ej: "Verifica tu cuenta") 
            cajarespuesta.style.color = "#e74c3c";
            cajarespuesta.innerText = `❌ ${data.mensaje}`;
        }
    } catch (error) {
        console.error(error);
        cajarespuesta.innerText = "❌ Error de conexión con el servidor";
    }
}
