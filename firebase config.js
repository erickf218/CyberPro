// ============================
// CyberPro — Configuración de Firebase
// ============================
// Este archivo debe cargarse DESPUÉS de los scripts compat de Firebase
// y ANTES de cualquier script que use "auth" o "db" (login.js, register.js, dashboard.js).

const firebaseConfig = {
    apiKey: "AIzaSyBC4EeYI8enm5IaArYDKYzMARfzTjlJTzE",
    authDomain: "cyberprocces.firebaseapp.com",
    projectId: "cyberprocces",
    storageBucket: "cyberprocces.firebasestorage.app",
    messagingSenderId: "495787645834",
    appId: "1:495787645834:web:29c0764c5ba43514da4673",
    measurementId: "G-N3Q284SFLK"
};

firebase.initializeApp(firebaseConfig);

// Variables globales disponibles para login.js, register.js y dashboard.js
const auth = firebase.auth();
const db = firebase.firestore();

// Traduce los códigos de error de Firebase a mensajes claros en español
function traducirErrorFirebase(codigo){
    const errores = {
        "auth/email-already-in-use": "Ese correo ya está registrado. Intenta iniciar sesión.",
        "auth/invalid-email": "El correo electrónico no es válido.",
        "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
        "auth/user-not-found": "No existe una cuenta con ese correo.",
        "auth/wrong-password": "La contraseña es incorrecta.",
        "auth/invalid-credential": "Correo o contraseña incorrectos.",
        "auth/too-many-requests": "Demasiados intentos. Espera un momento e inténtalo de nuevo."
    };

    return errores[codigo] || "Ocurrió un error. Inténtalo de nuevo.";
}

alert("Inicio firebase-config");

const firebaseConfig = {
    apiKey: "...",
    ...
};

firebase.initializeApp(firebaseConfig);

alert("Firebase inicializado");

const auth = firebase.auth();
alert("Auth creado");

const db = firebase.firestore();
alert("Firestore creado");