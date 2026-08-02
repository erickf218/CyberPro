// ============================
// CyberPro — index.js
// ============================

// Menú móvil
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");

if(navToggle && siteNav){
    navToggle.addEventListener("click", function(){
        siteNav.classList.toggle("open");
    });
}

// Animación del indicador OEE del hero (ilustrativa, no es un cálculo real)
const oeeCounter = document.getElementById("oee-counter");
const oeeBar = document.getElementById("oee-bar");
const oeeStatus = document.getElementById("oee-status");

const valorDemo = 78; // valor ilustrativo para el panel del hero

if(oeeCounter && oeeBar && oeeStatus){

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if(prefersReducedMotion){

        oeeCounter.innerHTML = valorDemo.toFixed(1) + "%";
        oeeBar.style.width = valorDemo + "%";
        oeeStatus.innerHTML = "🟡 Buen desempeño, con oportunidades de mejora.";

    } else {

        let actual = 0;
        const duracionMs = 1400;
        const pasos = 40;
        const incremento = valorDemo / pasos;

        const intervalo = setInterval(function(){

            actual += incremento;

            if(actual >= valorDemo){
                actual = valorDemo;
                clearInterval(intervalo);
                oeeStatus.innerHTML = "🟡 Buen desempeño, con oportunidades de mejora.";
            }

            oeeCounter.innerHTML = actual.toFixed(1) + "%";
            oeeBar.style.width = actual + "%";

        }, duracionMs / pasos);
    }
}

// ============================
// Pestañas del hero: Flujo de proceso / Máquina en vivo
// ============================

const btnFlujo = document.getElementById("btn-view-flujo");
const btnMaquina = document.getElementById("btn-view-maquina");
const viewDiagram = document.getElementById("view-diagram");
const view3d = document.getElementById("view-3d");
const panelLabelText = document.getElementById("panel-label-text");

function mostrarVistaFlujo(){
    btnFlujo.classList.add("active");
    btnMaquina.classList.remove("active");
    viewDiagram.classList.add("active");
    view3d.classList.remove("active");
    if(panelLabelText) panelLabelText.innerHTML = "PANEL_01 // FLUJO DE PLANTA";
}

function mostrarVistaMaquina(){
    btnMaquina.classList.add("active");
    btnFlujo.classList.remove("active");
    view3d.classList.add("active");
    viewDiagram.classList.remove("active");
    if(panelLabelText) panelLabelText.innerHTML = "PANEL_02 // LÍNEA DE PRODUCCIÓN";
}

if(btnFlujo && btnMaquina && viewDiagram && view3d){
    btnFlujo.addEventListener("click", mostrarVistaFlujo);
    btnMaquina.addEventListener("click", mostrarVistaMaquina);
}