const boton = document.getElementById("calcular");


boton.addEventListener("click", function(){


const produccionReal = Number(
document.getElementById("produccionReal").value
);


const produccionEsperada = Number(
document.getElementById("produccionEsperada").value
);



if(
isNaN(produccionReal) ||
isNaN(produccionEsperada)
){

alert("Completa todos los campos.");

return;

}



if(
produccionReal <= 0 ||
produccionEsperada <= 0
){

alert("Los valores deben ser mayores que cero.");

return;

}



if(produccionReal > produccionEsperada){

alert("La producción real no debería superar la producción esperada.");

return;

}



const eficiencia = 
(produccionReal / produccionEsperada) * 100;




document.getElementById("resultado").innerHTML =

"Eficiencia: " + eficiencia.toFixed(2) + "%";





let mensaje = "";



if(eficiencia >= 90){

mensaje = 
"Excelente eficiencia. El proceso está alcanzando un rendimiento muy alto.";

}

else if(eficiencia >= 70){

mensaje =
"Eficiencia aceptable. Existen oportunidades para mejorar el proceso.";

}

else{

mensaje =
"Baja eficiencia. Se recomienda analizar pérdidas, métodos de trabajo y recursos.";

}




document.getElementById("interpretacion").innerHTML = mensaje;


guardarIndicador("eficiencia", eficiencia.toFixed(2));

});