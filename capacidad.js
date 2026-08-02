const boton = document.getElementById("calcular");


boton.addEventListener("click", function(){


const horas = Number(
document.getElementById("horas").value
);


const produccion = Number(
document.getElementById("produccion").value
);



if(
isNaN(horas) ||
isNaN(produccion)
){

alert("Completa todos los campos.");

return;

}



if(
horas <= 0 ||
produccion <= 0
){

alert("Los valores deben ser mayores que cero.");

return;

}



const capacidad = horas * produccion;



document.getElementById("resultado").innerHTML =

"Capacidad instalada: " 
+ capacidad 
+ " unidades";




let mensaje = "";



if(capacidad >= 1000){

mensaje =
"Alta capacidad productiva. El sistema tiene un gran potencial de producción.";

}

else if(capacidad >= 400){

mensaje =
"Capacidad media. Puede analizarse si los recursos actuales son suficientes.";

}

else{

mensaje =
"Baja capacidad. Se recomienda revisar horarios, maquinaria o procesos.";

}




document.getElementById("interpretacion").innerHTML = mensaje;


guardarIndicador("capacidad", capacidad);

});