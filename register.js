// ============================
// CyberPro — register.js (conectado a Firebase)
// ============================

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

const form = document.getElementById("register-form");
const formError = document.getElementById("form-error");
const estadoPanel = document.getElementById("estado-panel");
const btnSubmit = document.querySelector(".btn-submit");

function mostrarError(mensaje){
    formError.innerHTML = mensaje;
    formError.classList.add("show");
}

if(form){

    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const password2Input = document.getElementById("password2");
    const terminosInput = document.getElementById("terminos");

    form.addEventListener("submit", function(e){

        e.preventDefault();
        formError.classList.remove("show");

        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const password2 = password2Input.value;

        if(nombre === "" || email === "" || password === "" || password2 === ""){
            mostrarError("Completa todos los campos para continuar.");
            return;
        }

        if(password.length < 6){
            mostrarError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if(password !== password2){
            mostrarError("Las contraseñas no coinciden.");
            return;
        }

        if(!terminosInput.checked){
            mostrarError("Debes aceptar los términos y condiciones.");
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.innerHTML = "Creando cuenta...";
        estadoPanel.innerHTML = "CREANDO CUENTA…";

        // Crea el usuario en Firebase Authentication
       auth.createUserWithEmailAndPassword(email, password)

.then(function(cred){

    return db.collection("usuarios")
        .doc(cred.user.uid)
        .set({

            nombre: nombre,

            email: email,

            indicadores: {},

            historial: []

        });

})

.then(function(){

    estadoPanel.innerHTML = "CUENTA CREADA";
    estadoPanel.classList.add("ok");

    window.location.href = "dashboard.html";

})

.catch(function(error){

    formError.innerHTML = traducirErrorFirebase(error.code);
    formError.classList.add("show");

    btnSubmit.disabled = false;
    btnSubmit.innerHTML = "Crear cuenta";
    estadoPanel.innerHTML = "ERROR";

});

    });

}