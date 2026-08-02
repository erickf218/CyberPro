const boton = document.getElementById("calcular");

boton.addEventListener("click", function(){

    const tiempoDisponible =
    Number(document.getElementById("tiempoDisponible").value);

    const demanda =
    Number(document.getElementById("demanda").value);

    if (tiempoDisponible <= 0 || demanda <= 0){
        alert("Ingresa valores mayores que cero.");
        return;
    }

    const takt = tiempoDisponible / demanda;

    document.getElementById("resultado").innerHTML =
    "Takt Time: " + takt.toFixed(2) + " minutos por pieza";

    guardarIndicador("takt", takt.toFixed(2));

    // Comparación con el tiempo de ciclo, si ya fue calculado
    const cicloGuardado = localStorage.getItem("ciclo");
    let mensaje = "";

    if(cicloGuardado){

        const ciclo = Number(cicloGuardado);

        if(ciclo <= takt){
            mensaje = "Tu tiempo de ciclo (" + ciclo.toFixed(2) +
            " min) es igual o menor al takt time. Tu proceso puede cumplir la demanda.";
        } else {
            mensaje = "Tu tiempo de ciclo (" + ciclo.toFixed(2) +
            " min) es mayor al takt time. Existe un cuello de botella que impide cumplir la demanda.";
        }

    } else {
        mensaje = "ℹCalcula también el Tiempo de Ciclo para comparar contra el Takt Time.";
    }

    document.getElementById("interpretacion").innerHTML = mensaje;

});