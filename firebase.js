// ============================
// CyberPro — register.js
// ============================

// Mostrar / ocultar contraseña (dos campos)
function activarToggle(botonId, inputId){
    const boton = document.getElementById(botonId);
    const input = document.getElementById(inputId);

    if(boton && input){
        boton.addEventListener("click", function(){
            const esTexto = input.type === "text";
            input.type = esTexto ? "password" : "text";
            boton.setAttribute("aria-label", esTexto ? "Mostrar contraseña" : "Ocultar contraseña");
        });
    }
}

activarToggle("toggle-pass", "password");
activarToggle("toggle-pass2", "password2");

// Validación + estado del panel
const form = document.getElementById("register-form");
const formError = document.getElementById("form-error");
const estadoPanel = document.getElementById("estado-panel");

if(form){

    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const password2Input = document.getElementById("password2");
    const terminosInput = document.getElementById("terminos");

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const password2 = password2Input.value;

        if(nombre === "" || email === "" || password === "" || password2 === ""){
            formError.innerHTML = "Completa todos los campos para continuar.";
            formError.classList.add("show");
            return;
        }

        if(password.length < 6){
            formError.innerHTML = "La contraseña debe tener al menos 6 caracteres.";
            formError.classList.add("show");
            return;
        }

        if(password !== password2){
            formError.innerHTML = "Las contraseñas no coinciden.";
            formError.classList.add("show");
            return;
        }

        if(!terminosInput.checked){
            formError.innerHTML = "Debes aceptar los términos y condiciones.";
            formError.classList.add("show");
            return;
        }

        formError.classList.remove("show");
        estadoPanel.innerHTML = "CUENTA CREADA";
        estadoPanel.classList.add("ok");

        // NOTA: esto es una demo visual, no un sistema de registro real.
        // Para producción se necesita un backend que guarde y valide credenciales de forma segura.
        setTimeout(function(){
            window.location.href = "dashboard.html";
        }, 700);

    });
}