// ============================
// CyberPro — login.js (conectado a Firebase)
// ============================

const togglePass = document.getElementById("toggle-pass");
const passwordInput = document.getElementById("password");

if(togglePass && passwordInput){
    togglePass.addEventListener("click", function(){
        const esTexto = passwordInput.type === "text";
        passwordInput.type = esTexto ? "password" : "text";
        togglePass.setAttribute("aria-label", esTexto ? "Mostrar contraseña" : "Ocultar contraseña");
    });
}

const form = document.getElementById("login-form");
const formError = document.getElementById("form-error");
const estadoPanel = document.getElementById("estado-panel");
const btnSubmit = document.getElementById("btn-submit");

function mostrarError(mensaje){
    formError.innerHTML = mensaje;
    formError.classList.add("show");
}

if(form){

    const emailInput = document.getElementById("email");

    emailInput.addEventListener("focus", function(){
        estadoPanel.innerHTML = "VERIFICANDO…";
        estadoPanel.classList.remove("ok");
    });

    form.addEventListener("submit", function(e){

        e.preventDefault();
        formError.classList.remove("show");

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if(email === "" || password === ""){
            mostrarError("Completa correo y contraseña para continuar.");
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = "Ingresando...";

        auth.signInWithEmailAndPassword(email, password)
            .then(function(){
                estadoPanel.innerHTML = "ACCESO CONCEDIDO";
                estadoPanel.classList.add("ok");

                setTimeout(function(){
                    window.location.href = "dashboard.html";
                }, 600);
            })
            .catch(function(error){
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = "Ingresar";
                estadoPanel.innerHTML = "EN ESPERA";
                estadoPanel.classList.remove("ok");
                mostrarError(traducirErrorFirebase(error.code));
            });

    });
}