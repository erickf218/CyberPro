const boton = document.getElementById("calcular");


boton.addEventListener("click", function(){


const produccionReal = Number(
document.getElementById("produccionReal").value
);


const capacidad = Number(
document.getElementById("capacidad").value
);



if(
isNaN(produccionReal) ||
isNaN(capacidad)
){

alert("Completa todos los campos.");

return;

}



if(
produccionReal <= 0 ||
capacidad <= 0
){

alert("Los valores deben ser mayores que cero.");

return;

}



if(produccionReal > capacidad){

alert("La producción real no puede superar la capacidad instalada.");

return;

}



const utilizacion =
(produccionReal / capacidad) * 100;



document.getElementById("resultado").innerHTML =

"Utilización: " + utilizacion.toFixed(2) + "%";




let mensaje = "";



if(utilizacion >= 85){

mensaje =
"Excelente utilización. El proceso está aprovechando muy bien su capacidad.";

}

else if(utilizacion >= 60){

mensaje =
"Utilización aceptable. Existe oportunidad para aumentar el aprovechamiento.";

}

else{

mensaje =
"Baja utilización. Se recomienda analizar pérdidas de capacidad o tiempos improductivos.";

}



document.getElementById("interpretacion").innerHTML = mensaje;


guardarIndicador("utilizacion", utilizacion.toFixed(2));

});