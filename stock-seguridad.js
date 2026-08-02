const boton = document.getElementById("calcular");

boton.addEventListener("click", function () {

    const demandaMax = Number(document.getElementById("demandaMax").value);
    const tiempoMax = Number(document.getElementById("tiempoMax").value);
    const demandaProm = Number(document.getElementById("demandaProm").value);
    const tiempoProm = Number(document.getElementById("tiempoProm").value);

    if (
        demandaMax <= 0 ||
        tiempoMax <= 0 ||
        demandaProm <= 0 ||
        tiempoProm <= 0
    ) {

        alert("Todos los valores deben ser mayores que cero.");

        return;

    }

    const stock = (demandaMax * tiempoMax) - (demandaProm * tiempoProm);

    document.getElementById("resultado").innerHTML =
    "Stock de Seguridad: " + stock.toFixed(0) + " unidades";

    document.getElementById("interpretacion").innerHTML =
    "Se recomienda mantener aproximadamente " +
    stock.toFixed(0) +
    " unidades como inventario de seguridad.";

guardarIndicador("stock", stock.toFixed(0));

});