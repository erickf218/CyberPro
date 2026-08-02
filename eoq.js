const boton = document.getElementById("calcular");

boton.addEventListener("click", function () {

    const demanda = Number(document.getElementById("demanda").value);

    const pedido = Number(document.getElementById("pedido").value);

    const mantenimiento = Number(document.getElementById("mantenimiento").value);

    if (demanda <= 0 || pedido <= 0 || mantenimiento <= 0) {

        alert("Todos los valores deben ser mayores que cero.");

        return;

    }

    const eoq = Math.sqrt((2 * demanda * pedido) / mantenimiento);

    document.getElementById("resultado").innerHTML =
    "EOQ: " + eoq.toFixed(2) + " unidades";

    document.getElementById("interpretacion").innerHTML =
    "Se recomienda realizar pedidos de aproximadamente " +
    eoq.toFixed(0) +
    " unidades para minimizar los costos totales de inventario.";

guardarIndicador("eoq", eoq.toFixed(2));

});