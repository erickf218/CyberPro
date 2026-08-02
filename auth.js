import { auth } from "./firebase.js";

import {

onAuthStateChanged,

signOut

}

from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const userName = document.getElementById("userName");

const dropdown = document.getElementById("userDropdown");

onAuthStateChanged(auth,function(user){

    if(user){

        userName.textContent=user.displayName || "Usuario";

        dropdown.innerHTML=`

<a href="dashboard.html">

Mi Dashboard

</a>

<a href="#" id="logout">

Cerrar sesión

</a>

`;

        document

        .getElementById("logout")

        .addEventListener("click",function(e){

            e.preventDefault();

            signOut(auth);

        });

    }

    else{

        userName.textContent="Invitado";

        dropdown.innerHTML=`

<a href="auth/login.html">

Iniciar sesión

</a>

<a href="auth/register.html">

Crear cuenta

</a>

`;

    }

});