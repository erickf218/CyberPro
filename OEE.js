const boton = document.getElementById("calcular");


boton.addEventListener("click", function(){


const disponibilidad = 
Number(document.getElementById("disponibilidad").value);


const rendimiento = 
Number(document.getElementById("rendimiento").value);


const calidad = 
Number(document.getElementById("calidad").value);



if (
    isNaN(disponibilidad) ||
    isNaN(rendimiento) ||
    isNaN(calidad)
) {

    alert("Completa todos los campos.");

    return;

}



if (
    disponibilidad < 0 || disponibilidad > 100 ||
    rendimiento < 0 || rendimiento > 100 ||
    calidad < 0 || calidad > 100
) {

    alert("Los porcentajes deben estar entre 0 y 100.");

    return;

}



const oee = 
(disponibilidad / 100) *
(rendimiento / 100) *
(calidad / 100) * 100;
localStorage.setItem("oee", oee.toFixed(2));



document.getElementById("resultado").innerHTML =
"OEE: " + oee.toFixed(2) + "%";

guardarIndicador("oee", oee.toFixed(2));

document.getElementById("barra-oee").style.width = oee + "%";


let mensaje = "";

if (oee >= 85) {

    mensaje = "Excelente. Tu proceso está dentro de estándares de clase mundial.";

} else if (oee >= 60) {

    mensaje = "Buen desempeño, pero existen oportunidades de mejora.";

} else {

    mensaje = "El OEE es bajo. Conviene analizar paros, velocidad y calidad.";

}

document.getElementById("interpretacion").innerHTML = mensaje;


});