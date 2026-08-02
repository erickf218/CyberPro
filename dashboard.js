// ============================
// Dashboard CyberProcess (solo localStorage, sin Firebase)
// ============================

let chartInstance = null;

// ============================
// Guardar indicador
// ============================

function guardarIndicador(nombre, valor){

    localStorage.setItem(nombre, valor);

    const historial = JSON.parse(localStorage.getItem("historial") || "[]");

    historial.unshift({
        indicador: nombre,
        valor: valor,
        fecha: new Date().toLocaleString("es-MX", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        })
    });

    if(historial.length > 20) historial.pop();

    localStorage.setItem("historial", JSON.stringify(historial));
}

// ============================
// Definición de indicadores
// ============================

const indicadores = [
    { clave: "oee", nombre: "OEE", unidad: "%", bueno: 85, regular: 60 },
    { clave: "leadtime", nombre: "Lead Time", unidad: " hrs" },
    { clave: "ciclo", nombre: "Tiempo de Ciclo", unidad: " min" },
    { clave: "takt", nombre: "Takt Time", unidad: " min" },
    { clave: "eoq", nombre: "EOQ", unidad: " uds" },
    { clave: "reorden", nombre: "Punto de Reorden", unidad: " uds" },
    { clave: "stock", nombre: "Stock de Seguridad", unidad: " uds" },
    { clave: "capacidad", nombre: "Capacidad", unidad: " uds", bueno: 1000, regular: 400 },
    { clave: "utilizacion", nombre: "Utilización", unidad: "%", bueno: 85, regular: 60 },
    { clave: "eficiencia", nombre: "Eficiencia", unidad: "%", bueno: 90, regular: 70 }
];

const indicadoresCarrusel = [
    { clave: "oee", nombre: "OEE", unidad: "%" },
    { clave: "leadtime", nombre: "Lead Time", unidad: " hrs" },
    { clave: "ciclo", nombre: "Tiempo de Ciclo", unidad: " min" },
    { clave: "takt", nombre: "Takt Time", unidad: " min" },
    { clave: "eoq", nombre: "EOQ", unidad: " uds" },
    { clave: "reorden", nombre: "Punto de Reorden", unidad: " uds" },
    { clave: "stock", nombre: "Stock", unidad: " uds" },
    { clave: "capacidad", nombre: "Capacidad", unidad: " uds" },
    { clave: "utilizacion", nombre: "Utilización", unidad: "%" },
    { clave: "eficiencia", nombre: "Eficiencia", unidad: "%" }
];

let indicadorActual = 0;
let grafica = null;

let indiceActual = 0;

const histTitulo = document.getElementById("hist-titulo");
const histLista = document.getElementById("hist-lista");

const LEADTIME_ALTO = 48;

// ============================
// Renderizado del dashboard
// ============================

function renderizarDashboard(){

    const conSemaforo = [];

    let totalRegistrados = 0;
    let totalVerde = 0;
    let totalAmarillo = 0;
    let totalRojo = 0;

    indicadores.forEach(function(item){

        const valorGuardado = localStorage.getItem(item.clave);
        const elementoValor = document.getElementById(item.clave);
        const elementoEstado = document.getElementById("estado-" + item.clave);

        if(!elementoValor || !elementoEstado) return;
        if(!valorGuardado) return;

        totalRegistrados++;

        const valorNumerico = Number(valorGuardado);
        elementoValor.innerHTML = valorNumerico.toFixed(2) + item.unidad;

        if(item.bueno !== undefined){

            let nivel;

            if(valorNumerico >= item.bueno){
                elementoEstado.innerHTML = "Excelente";
                nivel = 2; totalVerde++;
            } else if(valorNumerico >= item.regular){
                elementoEstado.innerHTML = "Aceptable";
                nivel = 1; totalAmarillo++;
            } else {
                elementoEstado.innerHTML = "Mejorar";
                nivel = 0; totalRojo++;
            }

            conSemaforo.push({
                clave: item.clave, nombre: item.nombre,
                nivel: nivel, valor: valorNumerico, unidad: item.unidad
            });

        } else if(item.clave === "takt"){
            const cicloGuardado = localStorage.getItem("ciclo");
            if(cicloGuardado){
                const ciclo = Number(cicloGuardado);
                if(ciclo <= valorNumerico){ elementoEstado.innerHTML = "Cumple la demanda"; totalVerde++; }
                else { elementoEstado.innerHTML = "Cuello de botella"; totalRojo++; }
            } else {
                elementoEstado.innerHTML = "Registrado";
            }
        } else if(item.clave === "ciclo"){
            const taktGuardado = localStorage.getItem("takt");
            if(taktGuardado){
                const takt = Number(taktGuardado);
                if(valorNumerico <= takt){ elementoEstado.innerHTML = "Cumple la demanda"; totalVerde++; }
                else { elementoEstado.innerHTML = "Cuello de botella"; totalRojo++; }
            } else {
                elementoEstado.innerHTML = "Registrado";
            }
        } else if(item.clave === "stock"){
            if(valorNumerico <= 0){ elementoEstado.innerHTML = "Sin margen de seguridad"; totalRojo++; }
            else { elementoEstado.innerHTML = "Con margen de seguridad"; totalVerde++; }
        } else {
            elementoEstado.innerHTML = "Registrado";
        }

    });

    // KPIs superiores
    const kpiTotal = document.getElementById("kpi-total");
    const kpiVerde = document.getElementById("kpi-verde");
    const kpiAmarillo = document.getElementById("kpi-amarillo");
    const kpiRojo = document.getElementById("kpi-rojo");

    if(kpiTotal) kpiTotal.innerHTML = totalRegistrados + " / " + indicadores.length;
    if(kpiVerde) kpiVerde.innerHTML = totalVerde;
    if(kpiAmarillo) kpiAmarillo.innerHTML = totalAmarillo;
    if(kpiRojo) kpiRojo.innerHTML = totalRojo;

    // Mejor y peor indicador
    const mejorEl = document.getElementById("mejor-indicador");
    const peorEl = document.getElementById("peor-indicador");

    if(conSemaforo.length === 0){
        if(mejorEl) mejorEl.innerHTML = "Sin datos suficientes todavía.";
        if(peorEl) peorEl.innerHTML = "Sin datos suficientes todavía.";
    } else {
        const mejor = conSemaforo.reduce((a, b) => (b.nivel > a.nivel ? b : a));
        const peor = conSemaforo.reduce((a, b) => (b.nivel < a.nivel ? b : a));

        if(mejorEl) mejorEl.innerHTML = "Mejor: " + mejor.nombre + ": " + mejor.valor.toFixed(2) + mejor.unidad;
        if(peorEl) peorEl.innerHTML = "Atención: " + peor.nombre + ": " + peor.valor.toFixed(2) + peor.unidad;
    }

    // Estado general
    const estadoGeneral = document.getElementById("estado-general");

    if(estadoGeneral){
        const totalConSemaforo = 4;

        if(conSemaforo.length === 0){
            estadoGeneral.innerHTML = "Esperando indicadores...";
        } else if(conSemaforo.length < totalConSemaforo){
            estadoGeneral.innerHTML = "Faltan indicadores por registrar (" + conSemaforo.length + " de " + totalConSemaforo + ")";
        } else {
            const promedio = conSemaforo.reduce((s, i) => s + i.nivel, 0) / conSemaforo.length;
            if(promedio >= 1.5) estadoGeneral.innerHTML = "El proceso general está en buen estado.";
            else if(promedio >= 0.8) estadoGeneral.innerHTML = "El proceso general es aceptable, hay oportunidades de mejora.";
            else estadoGeneral.innerHTML = "El proceso general necesita atención urgente.";
        }
    }

    // Recomendaciones prioritarias
    const listaRecomendaciones = document.getElementById("recomendaciones");

    if(listaRecomendaciones){

        const recomendaciones = [];

        const oee = localStorage.getItem("oee");
        const leadtime = localStorage.getItem("leadtime");
        const stock = localStorage.getItem("stock");
        const utilizacion = localStorage.getItem("utilizacion");
        const eficiencia = localStorage.getItem("eficiencia");
        const capacidad = localStorage.getItem("capacidad");
        const ciclo = localStorage.getItem("ciclo");
        const takt = localStorage.getItem("takt");

        if(oee && Number(oee) < 85) recomendaciones.push("OEE bajo: revisa pérdidas por disponibilidad, rendimiento y calidad.");
        if(leadtime && Number(leadtime) > LEADTIME_ALTO) recomendaciones.push("Lead Time alto: analiza los tiempos de espera entre procesos.");
        if(stock && Number(stock) <= 0) recomendaciones.push("Stock de Seguridad insuficiente: existe riesgo de ruptura de inventario.");
        if(utilizacion && Number(utilizacion) > 95) recomendaciones.push("Utilización casi al límite: considera ampliar recursos o turnos.");
        if(eficiencia && Number(eficiencia) < 70) recomendaciones.push("Eficiencia baja: revisa métodos de trabajo y pérdidas operativas.");
        if(capacidad && Number(capacidad) < 400) recomendaciones.push("Capacidad instalada baja: evalúa horarios, maquinaria o procesos.");
        if(ciclo && takt && Number(ciclo) > Number(takt)) recomendaciones.push("Tiempo de Ciclo mayor al Takt Time: existe un cuello de botella que impide cumplir la demanda.");

        if(recomendaciones.length === 0){
            listaRecomendaciones.innerHTML = totalRegistrados === 0
                ? "<li>Registra tus indicadores para ver recomendaciones.</li>"
                : "<li>No se detectaron alertas por ahora. Buen trabajo.</li>";
        } else {
            listaRecomendaciones.innerHTML = recomendaciones.map(r => "<li>" + r + "</li>").join("");
        }
    }

    // ============================
    // TABLA DE INDICADORES
    // ============================

    const tabla = document.getElementById("tabla-indicadores");

    if(tabla){
        tabla.innerHTML = indicadores.map(function(item){
            const valor = localStorage.getItem(item.clave);
            const texto = valor ? Number(valor).toFixed(2) + item.unidad : "Sin datos";

            let colorPunto = "#6c757d";
            if(valor && item.bueno !== undefined){
                const num = Number(valor);
                colorPunto = num >= item.bueno ? "#22c55e" : (num >= item.regular ? "#eab308" : "#ef4444");
            }

            return "<tr><td><span class='punto-estado' style='background:" + colorPunto + "'></span>" +
                   item.nombre + "</td><td class='valor-tabla'>" + texto + "</td></tr>";
        }).join("");
    }

    // Historial (lista principal, abajo del todo)
    const listaHistorial = document.getElementById("historial");

    if(listaHistorial){
        const historialGeneral = JSON.parse(localStorage.getItem("historial") || "[]");

        if(historialGeneral.length === 0){
            listaHistorial.innerHTML = "<li>Sin actividad registrada todavía.</li>";
        } else {
            listaHistorial.innerHTML = historialGeneral.map(function(h){
                const nombreIndicador = indicadores.find(i => i.clave === h.indicador)?.nombre || h.indicador;
                return "<li>" + h.fecha + " — " + nombreIndicador + ": " + h.valor + "</li>";
            }).join("");
        }
    }

    // ============================
    // CARRUSEL DE HISTORIAL (por ahora fijo en OEE)
    // ============================

    const lista = document.getElementById("hist-lista");

    if(lista){

        const historialCompleto = JSON.parse(localStorage.getItem("historial") || "[]");
        const entradasOee = historialCompleto.filter(function(h){ return h.indicador === "oee"; });

        if(entradasOee.length === 0){
            lista.innerHTML = "<li>Sin actividad registrada para OEE todavía.</li>";
        } else {
            lista.innerHTML = entradasOee.map(function(h){
                return "<li>" + h.fecha + "<br>OEE: " + h.valor + "%</li>";
            }).join("");
        }
    }

    // ============================
    // GAUGE DE OEE EN VIVO
    // ============================

    const valorOee = Number(localStorage.getItem("oee") || 0);
    const arco = document.getElementById("gauge-arc");
    const textoGauge = document.getElementById("gauge-value");

    if(arco){
        const largo = 251;
        const valorLimitado = Math.min(valorOee, 100);

        arco.style.stroke = valorLimitado >= 85 ? "#22c55e" : (valorLimitado >= 60 ? "#eab308" : "#ef4444");
        arco.style.strokeDasharray = largo;
        arco.style.strokeDashoffset = largo - (valorLimitado / 100) * largo;
        arco.style.transition = "stroke-dashoffset 1s ease, stroke .3s ease";
    }

    if(textoGauge){
        textoGauge.innerHTML = localStorage.getItem("oee") ? valorOee.toFixed(2) + "%" : "Sin datos";
    }

    // ============================
    // GRÁFICA DEL HISTORIAL DE OEE
    // ============================

    const canvas = document.getElementById("historyChart");

    if(canvas && typeof Chart !== "undefined"){

        if(chartInstance){
            chartInstance.destroy();
            chartInstance = null;
        }

        const indicador = indicadoresCarrusel[indiceActual];

        const historialCompleto = JSON.parse(localStorage.getItem("historial") || "[]");

        const entradas = historialCompleto
            .filter(h => h.indicador === indicador.clave)
            .reverse();

        const etiquetas = entradas.map(h => h.fecha);
        const datos = entradas.map(h => Number(h.valor));

        if(datos.length === 0){
            const contexto = canvas.getContext("2d");
            contexto.clearRect(0, 0, canvas.width, canvas.height);
            contexto.font = "14px Arial";
            contexto.fillStyle = "#888";
            contexto.fillText("Aún no hay historial de " + indicador.nombre + ".",10,100);
        } else {
            chartInstance = new Chart(canvas, {
                type: "line",
                data: {
                    labels: etiquetas,
                    datasets: [{
                        label: indicador.nombre,
                        data: datos,
                        borderColor: "#0b5ed7",
                        backgroundColor: "rgba(11,94,215,.1)",
                        fill: true,
                        tension: 0.3,
                        pointRadius: 3,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { min: 0, max: 100 },
                        x: { ticks: { maxRotation: 45, autoSkip: true } }
                    }
                }
            });
        }
    }
}

// ============================
// Funciones del Carrusel y Gauge
// ============================

function actualizarHistorialCarrusel(){

    const indicador = indicadoresCarrusel[indiceActual];

    histTitulo.innerHTML = "Historial de " + indicador.nombre;

    const historial = JSON.parse(localStorage.getItem("historial") || "[]");

    const registros = historial.filter(
        h => h.indicador === indicador.clave
    );

    if(registros.length === 0){

        histLista.innerHTML = "<li>Sin registros todavía.</li>";
        return;
    }

    histLista.innerHTML = registros.map(h => `
        <li>
            ${h.fecha}<br>
            ${h.valor}${indicador.unidad}
        </li>
    `).join("");

}

function actualizarGaugeYGrafica(){

    const indicador = indicadoresCarrusel[indiceActual];

    document.getElementById("gauge-titulo").innerHTML = indicador.nombre + " en vivo";
    document.getElementById("chart-titulo").innerHTML = "Historial de " + indicador.nombre;

    const valor = Number(localStorage.getItem(indicador.clave) || 0);

    const arco = document.getElementById("gauge-arc");
    const texto = document.getElementById("gauge-value");

    const largo = 251;

    let porcentaje = valor;

    if(indicador.unidad != "%"){
        porcentaje = Math.min(valor/1000*100,100);
    }

    arco.style.stroke =
        porcentaje >= 85 ? "#22c55e" :
        porcentaje >= 60 ? "#eab308" :
        "#ef4444";

    arco.style.strokeDashoffset = largo - (porcentaje / 100) * largo;

    texto.innerHTML = valor ? valor.toFixed(2) + indicador.unidad : "Sin datos";

    const historial = JSON.parse(localStorage.getItem("historial") || "[]");

    const registros = historial
        .filter(h => h.indicador == indicador.clave)
        .reverse();

    const etiquetas = registros.map(h => h.fecha);
    const datos = registros.map(h => Number(h.valor));

    if(chartInstance){
        chartInstance.destroy();
    }

    chartInstance = new Chart(document.getElementById("historyChart"),{
        type: "line",
        data: {
            labels: etiquetas,
            datasets: [{
                data: datos,
                borderWidth: 3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

}

// ============================
// Event Listeners
// ============================

document.getElementById("hist-next")
.addEventListener("click", function(){

    indiceActual++;

    if(indiceActual >= indicadoresCarrusel.length){
        indiceActual = 0;
    }

    actualizarHistorialCarrusel();
    actualizarGaugeYGrafica();

});

document.getElementById("hist-prev")
.addEventListener("click", function(){

    indiceActual--;

    if(indiceActual < 0){
        indiceActual = indicadoresCarrusel.length - 1;
    }

    actualizarHistorialCarrusel();
    actualizarGaugeYGrafica();

});

document.getElementById("gauge-next")
.addEventListener("click", function(){

    indiceActual++;

    if(indiceActual >= indicadoresCarrusel.length){
        indiceActual = 0;
    }

    actualizarGaugeYGrafica();

});

document.getElementById("gauge-prev")
.addEventListener("click", function(){

    indiceActual--;

    if(indiceActual < 0){
        indiceActual = indicadoresCarrusel.length - 1;
    }

    actualizarGaugeYGrafica();

});

// ============================
// CHAT CON IA REAL (Gemini, vía Cloudflare Worker)
// ============================

const URL_WORKER = "https://cyberpro-ia-v2.eflores43479.workers.dev";

const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

if(chatLog && chatInput && chatSend){

    agregarMensajeChat("Hola, pregúntame sobre tu OEE, lead time, stock o cualquier indicador.", "sistema");

    chatSend.addEventListener("click", enviarPreguntaChat);
    chatInput.addEventListener("keydown", function(e){
        if(e.key === "Enter") enviarPreguntaChat();
    });
}

function agregarMensajeChat(texto, tipo){
    const div = document.createElement("div");
    div.className = "chat-msg " + tipo;
    div.innerHTML = texto;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
}

async function enviarPreguntaChat(){

    const pregunta = chatInput.value.trim();
    if(pregunta === "") return;

    agregarMensajeChat(pregunta, "usuario");
    chatInput.value = "";

    agregarMensajeChat("Escribiendo...", "sistema pensando");

    // Armamos el objeto con tus datos reales para dárselos a la IA como contexto
    const datosReales = {};
    indicadores.forEach(function(item){
        const valor = localStorage.getItem(item.clave);
        datosReales[item.nombre] = valor ? valor + item.unidad : "sin datos";
    });

    try {
        const respuesta = await fetch(URL_WORKER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pregunta: pregunta, indicadores: datosReales })
        });

        // 1. Validar si la respuesta HTTP tuvo un estado fuera del rango 200-299
        if (!respuesta.ok) {
            let textoError = `Error HTTP ${respuesta.status}: ${respuesta.statusText}`;
            try {
                const errJson = await respuesta.json();
                if (errJson.error || errJson.respuesta) {
                    textoError = errJson.error || errJson.respuesta;
                }
            } catch (_) {
                // Si la respuesta de error no era JSON, leemos el texto
                const errTexto = await respuesta.text();
                if (errTexto) textoError = errTexto;
            }
            throw new Error(textoError);
        }

        const datos = await respuesta.json();

        document.querySelector(".chat-msg.pensando")?.remove();

        // 2. Mostrar la respuesta de la IA o el mensaje de error descriptivo devuelto por el Worker
        if (datos.respuesta) {
            agregarMensajeChat(datos.respuesta, "sistema");
        } else if (datos.error) {
            agregarMensajeChat(`⚠️ ${datos.error}`, "sistema");
        } else {
            agregarMensajeChat("No se recibió contenido en la respuesta de la IA.", "sistema");
        }

    } catch (error) {
        document.querySelector(".chat-msg.pensando")?.remove();
        
        // 3. Imprimir el detalle técnico completo en la consola para depuración
        console.error("[CyberPro IA Error Detail]:", error);

        // 4. Mostrar al usuario la causa específica del fallo
        agregarMensajeChat(`⚠️ Error al conectar con la IA: ${error.message}`, "sistema");
    }
}

// ============================
// Inicialización
// ============================

renderizarDashboard();
actualizarHistorialCarrusel();
actualizarGaugeYGrafica();

// ============================
// Botón Limpiar Dashboard
// ============================

const botonLimpiar = document.getElementById("btn-limpiar");

if(botonLimpiar){
    botonLimpiar.addEventListener("click", function(){

        const confirmar = confirm("¿Seguro que deseas borrar todos los indicadores guardados? Esta acción no se puede deshacer.");
        if(!confirmar) return;

        indicadores.forEach(item => localStorage.removeItem(item.clave));
        localStorage.removeItem("historial");

        location.reload();
    });
}
