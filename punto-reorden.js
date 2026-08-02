const boton = document.getElementById("calcular");

boton.addEventListener("click", function () {

    const demanda = Number(document.getElementById("demanda").value);

    const entrega = Number(document.getElementById("entrega").value);

    if (demanda <= 0 || entrega <= 0){

        alert("Todos los valores deben ser mayores que cero.");

        return;

    }

    const puntoReorden = demanda * entrega;

    document.getElementById("resultado").innerHTML =
    "Punto de Reorden: " + puntoReorden.toFixed(0) + " unidades";

    document.getElementById("interpretacion").innerHTML =
    "Cuando tu inventario llegue aproximadamente a " +
    puntoReorden.toFixed(0) +
    " unidades, es recomendable realizar un nuevo pedido.";

guardarIndicador("reorden", puntoReorden.toFixed(0));

});