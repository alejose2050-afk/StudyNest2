async function enviarDatos() {
    const nombreInput = document.getElementById('nombreInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const cajarespuesta = document.getElementById('respuesta');

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    //Validacion del Frontend.

    if (!nombre || !email || !password) {
        cajarespuesta.textContent = `<span style="color: #ff4444;">⚠️ Por favor, llena todos los campos.</span>`;
        return;
    }

    cajarespuesta.innerText = "Registrando usuario...";

    try {
        //enviamos los datos al servidor.

        const response = await fetch('http://127.0.0.1:5000/api/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nombre, email: email, password: password 

            })
        });

        const data = await response .json();

        //Mostramos la respuestas del servidor.

        if (response.ok){
            cajarespuesta.innerHTML = `
            <span style="color: #2ecc71;">✅ ${data.mensaje} + <br>
            Bienvenido, ${data.usuario.nombre}</span>
            
            `;

            // Limpiamos el formulario tras un registro exitoso
            nombreInput.value = "";
            emailInput.value = "";
            passwordInput.value = "";
        } else {
            cajaRespuesta.innerHTML = `<span style="color: #ff4444;">❌ Error: ${data.mensaje}</span>`;
        }

    } catch (error) {
        console.error("Error:", error);
        cajaRespuesta.innerHTML = `<span style="color: #ff4444;">❌ Error: El servidor no responde</span>`;
    }
}




    