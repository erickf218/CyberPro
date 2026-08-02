const boton = document.getElementById("calcular");


boton.addEventListener("click", function(){

    const espera = document.getElementById("espera").value;

    const procesamiento = document.getElementById("procesamiento").value;


    if(espera === "" || procesamiento === ""){

        alert("Completa todos los campos.");

        return;

    }


    const leadTime = Number(espera) + Number(procesamiento);

    guardarIndicador("leadtime", leadTime);
    

    document.getElementById("resultado").innerHTML =
    "Lead Time: " + leadTime + " horas";

});