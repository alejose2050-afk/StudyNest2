async function enviarDatos() {
    const nombreInput = document.getElementById('nombreInput');
    const cajaRespuesta = document.getElementById('respuesta');
    const nombre = nombreInput.value.trim();

    if (!nombre) {
        alert("Escribe un nombre");
        return;
    }

    cajaRespuesta.innerText = "Conectando...";

    try {
        const response = await fetch('http://127.0.0.1:5000/api/nombre', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nombre })
        });

        if (!response.ok) throw new Error("Error en el servidor");

        const data = await response.json();
        
        cajaRespuesta.innerHTML = `
            <span style="color: green;">✅ ${data.mensaje} <br> 
            ¡Hola, ${data.nombre}!</span>
        `;

    } catch (error) {
        console.error("Error:", error);
        cajaRespuesta.innerHTML = <span style="color: red;">❌ Error: ¿Servidor encendido?</span>;
    }
}