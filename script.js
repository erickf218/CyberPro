const boton = document.getElementById("calcular");

boton.addEventListener("click", function(){

    const tiempo = Number(document.getElementById("tiempo").value);
    const piezas = Number(document.getElementById("piezas").value);

    if(isNaN(tiempo) || isNaN(piezas)){
        alert("Completa todos los campos.");
        return;
    }

    if(tiempo <= 0 || piezas <= 0){
        alert("Los valores deben ser mayores que cero.");
        return;
    }

    const ciclo = tiempo / piezas;

    guardarIndicador("ciclo", ciclo.toFixed(2));

    document.getElementById("resultado").innerHTML =
    "Tiempo de ciclo: " + ciclo.toFixed(2) + " minutos por pieza";

    // Comparación con el takt time, si ya fue calculado
    const taktGuardado = localStorage.getItem("takt");
    let mensaje = "";

    if(taktGuardado){

        const takt = Number(taktGuardado);

        if(ciclo <= takt){
            mensaje = "Tu tiempo de ciclo es igual o menor al takt time (" +
            takt.toFixed(2) + " min). Tu proceso puede cumplir la demanda.";
        } else {
            mensaje = "Tu tiempo de ciclo supera al takt time (" +
            takt.toFixed(2) + " min). Existe un cuello de botella.";
        }

    } else {
        mensaje = "ℹCalcula también el Takt Time para comparar tu ritmo de producción.";
    }

    document.getElementById("interpretacion").innerHTML = mensaje;

});