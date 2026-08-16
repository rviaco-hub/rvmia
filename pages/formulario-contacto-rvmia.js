/*=====================================================
    RVMIA - FORMULARIO DE CONTACTO
=====================================================*/

const form = document.getElementById("contactForm");
const btn = document.getElementById("btnEnviar");
const msg = document.getElementById("formMessage");
const spinner = btn.querySelector(".spinner");
const btnText = btn.querySelector(".btn-text");

const textarea = document.getElementById("mensaje");
const contador = document.getElementById("contador");

// Anti-bot timestamp
const timestamp = document.getElementById("formTimestamp");
timestamp.value = Date.now();

// Contador de caracteres
textarea.addEventListener("input", () => {
    contador.textContent = `${textarea.value.length} / 3000 caracteres`;
});

// Limpiar espacios al salir
document.querySelectorAll("input, textarea").forEach(campo => {
    campo.addEventListener("blur", () => {
        campo.value = campo.value.trim();
    });
});

// Validación teléfono
function telefonoValido(numero) {
    return /^[0-9+\-\s()]{7,20}$/.test(numero);
}

// Mostrar mensajes
function mostrarMensaje(texto, correcto = true) {

    msg.className = "form-message";

    msg.classList.add(correcto ? "success" : "error");

    msg.innerHTML = texto;

    msg.style.display = "block";

    msg.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}

//=====================================================
// ENVÍO
//=====================================================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Honeypot
    if (document.getElementById("website").value !== "") {
        return;
    }

    // Tiempo mínimo
    const segundos = (Date.now() - Number(timestamp.value)) / 1000;

    if (segundos < 4) {

        mostrarMensaje(
            "Has enviado el formulario demasiado rápido.",
            false
        );

        return;
    }

    // Validaciones HTML
    if (!form.checkValidity()) {

        form.reportValidity();

        return;

    }

    // Validación teléfono
    if (!telefonoValido(document.getElementById("telefono").value)) {

        mostrarMensaje(
            "Ingrese un número telefónico válido.",
            false
        );

        return;

    }

    btn.disabled = true;

    spinner.hidden = false;

    btnText.textContent = "Enviando...";

    //-------------------------------------------------
    // Crear FormData
    //-------------------------------------------------

    const formData = new FormData(form);

    formData.append(
        "access_key",
        "49781af5-5baf-4e17-82b7-252a408d00a2"
    );

    formData.append(
        "subject",
        "Nueva solicitud comercial desde RVMIA.COM"
    );

    formData.append(
        "from_name",
        "Sitio Web RVMIA"
    );

    formData.append(
        "replyto",
        document.getElementById("email").value
    );

    formData.append(
        "botcheck",
        ""
    );

    try {

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (data.success) {

            mostrarMensaje(
                "✅ Hemos recibido tu solicitud correctamente. Un ingeniero de RVMIA se comunicará contigo en un plazo máximo de 24 horas hábiles."
            );

            form.reset();

            contador.textContent = "0 / 3000 caracteres";

            timestamp.value = Date.now();

        } else {

            mostrarMensaje(
                "No fue posible enviar la solicitud. Intente nuevamente.",
                false
            );

            console.error(data);

        }

    } catch (error) {

        console.error(error);

        mostrarMensaje(
            "Error de conexión con el servidor. Intente nuevamente.",
            false
        );

    }

    spinner.hidden = true;

    btn.disabled = false;

    btnText.textContent = "Enviar solicitud";

});