// ============================
// CyberPro — machine.js
// Línea de producción 3D interactiva
// Cada estación tiene su propia forma, tamaño y color — no son copias.
// ============================

(function(){

    const contenedor = document.getElementById("machine-canvas");
    if(!contenedor || typeof THREE === "undefined") return;

    const ancho = contenedor.clientWidth;
    const alto = contenedor.clientHeight;

    // --- Escena, cámara y renderer ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, ancho / alto, 0.1, 100);
    camera.position.set(7, 5.5, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(ancho, alto);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    contenedor.appendChild(renderer.domElement);

    // --- Controles ---
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.3, 0);
    controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 15;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.update();

    controls.addEventListener("start", function(){ controls.autoRotate = false; });

    // --- Luces ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    const luzDireccional = new THREE.DirectionalLight(0xffffff, 0.85);
    luzDireccional.position.set(6, 8, 4);
    scene.add(luzDireccional);

    // --- Piso tipo "plano de planta" (blueprint) ---
    const piso = new THREE.Mesh(
        new THREE.PlaneGeometry(14, 10),
        new THREE.MeshStandardMaterial({ color: 0x0f172a })
    );
    piso.rotation.x = -Math.PI / 2;
    scene.add(piso);

    const cuadricula = new THREE.GridHelper(14, 28, 0x334155, 0x1e293b);
    cuadricula.position.y = 0.01;
    scene.add(cuadricula);

    const meshesClickeables = [];

    function marcarClickeable(mesh, nombreEstacion){
        mesh.userData.nombreEstacion = nombreEstacion;
        meshesClickeables.push(mesh);
    }

    // Pequeña luz indicadora reutilizable, para no repetir código (pero cada estación
    // la coloca en un punto distinto según su propia forma)
    function crearIndicador(color){
        return new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 12, 12),
            new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.9 })
        );
    }

    // ============================
    // ESTACIÓN 1 — Recepción
    // Forma: plataforma baja + tambores apilados (cilindros)
    // ============================
    (function(){
        const grupo = new THREE.Group();
        grupo.position.set(-4.5, 0, -2);

        const plataforma = new THREE.Mesh(
            new THREE.BoxGeometry(2.2, 0.3, 1.8),
            new THREE.MeshStandardMaterial({ color: 0x64748b })
        );
        plataforma.position.y = 0.15;
        grupo.add(plataforma);
        marcarClickeable(plataforma, "Recepción");

        const tambor1 = new THREE.Mesh(
            new THREE.CylinderGeometry(0.35, 0.35, 0.9, 20),
            new THREE.MeshStandardMaterial({ color: 0x94a3b8 })
        );
        tambor1.position.set(-0.5, 0.75, 0);
        grupo.add(tambor1);
        marcarClickeable(tambor1, "Recepción");

        const tambor2 = tambor1.clone();
        tambor2.position.set(0.4, 0.75, 0.3);
        grupo.add(tambor2);
        marcarClickeable(tambor2, "Recepción");

        const indicador = crearIndicador(0xf59e0b);
        indicador.position.set(0, 1.35, 0);
        grupo.add(indicador);

        scene.add(grupo);
    })();

    // ============================
    // ESTACIÓN 2 — Máquina A
    // Forma: columna + cabezal + husillo (tipo prensa/CNC)
    // ============================
    (function(){
        const grupo = new THREE.Group();
        grupo.position.set(-1.4, 0, 1.6);

        const base = new THREE.Mesh(
            new THREE.BoxGeometry(1.6, 0.3, 1.4),
            new THREE.MeshStandardMaterial({ color: 0x0b5ed7 })
        );
        base.position.y = 0.15;
        grupo.add(base);
        marcarClickeable(base, "Máquina A");

        const columna = new THREE.Mesh(
            new THREE.BoxGeometry(0.35, 2, 0.35),
            new THREE.MeshStandardMaterial({ color: 0x094bb0 })
        );
        columna.position.set(-0.5, 1.15, -0.4);
        grupo.add(columna);
        marcarClickeable(columna, "Máquina A");

        const cabezal = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.4, 0.8),
            new THREE.MeshStandardMaterial({ color: 0x0b5ed7 })
        );
        cabezal.position.set(0, 1.95, -0.1);
        grupo.add(cabezal);
        marcarClickeable(cabezal, "Máquina A");

        const husillo = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.08, 0.9, 16),
            new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.5, roughness: 0.3 })
        );
        husillo.position.set(0, 1.3, -0.1);
        grupo.add(husillo);
        marcarClickeable(husillo, "Máquina A");

        const indicador = crearIndicador(0xf59e0b);
        indicador.position.set(0.7, 0.5, 0.6);
        grupo.add(indicador);

        scene.add(grupo);
    })();

    // ============================
    // ESTACIÓN 3 — Máquina B
    // Forma: cuerpo ancho + tolva cónica encima (máquina de alimentación)
    // ============================
    (function(){
        const grupo = new THREE.Group();
        grupo.position.set(2, 0, -1.4);

        const cuerpo = new THREE.Mesh(
            new THREE.BoxGeometry(2, 1, 1.3),
            new THREE.MeshStandardMaterial({ color: 0x14b8a6 })
        );
        cuerpo.position.y = 0.5;
        grupo.add(cuerpo);
        marcarClickeable(cuerpo, "Máquina B");

        const tolva = new THREE.Mesh(
            new THREE.ConeGeometry(0.55, 0.9, 4),
            new THREE.MeshStandardMaterial({ color: 0x0f766e })
        );
        tolva.position.set(0, 1.45, 0);
        tolva.rotation.y = Math.PI / 4;
        grupo.add(tolva);
        marcarClickeable(tolva, "Máquina B");

        const indicador = crearIndicador(0xf59e0b);
        indicador.position.set(1.1, 1.1, 0.7);
        grupo.add(indicador);

        scene.add(grupo);
    })();

    // ============================
    // ESTACIÓN 4 — Empaque
    // Forma: banda transportadora larga y baja + caja de salida
    // ============================
    (function(){
        const grupo = new THREE.Group();
        grupo.position.set(4.6, 0, 1.8);

        const banda = new THREE.Mesh(
            new THREE.BoxGeometry(2.6, 0.25, 0.7),
            new THREE.MeshStandardMaterial({ color: 0xf59e0b })
        );
        banda.position.y = 0.4;
        banda.rotation.y = -0.3;
        grupo.add(banda);
        marcarClickeable(banda, "Empaque");

        const cajaSalida = new THREE.Mesh(
            new THREE.BoxGeometry(0.7, 0.6, 0.7),
            new THREE.MeshStandardMaterial({ color: 0xb45309 })
        );
        cajaSalida.position.set(1.3, 0.7, -0.35);
        grupo.add(cajaSalida);
        marcarClickeable(cajaSalida, "Empaque");

        const indicador = crearIndicador(0xf59e0b);
        indicador.position.set(-1.1, 0.7, 0.2);
        grupo.add(indicador);

        scene.add(grupo);
    })();

    // --- Panel flotante de indicadores ---
    const panel = document.getElementById("station-panel");
    const panelTitulo = document.getElementById("station-panel-title");
    const panelCerrar = document.getElementById("station-panel-close");
    const statOee = document.getElementById("station-oee");
    const statLeadtime = document.getElementById("station-leadtime");
    const statCiclo = document.getElementById("station-ciclo");

    function mostrarPanel(nombreEstacion){

        const oee = localStorage.getItem("oee");
        const leadtime = localStorage.getItem("leadtime");
        const ciclo = localStorage.getItem("ciclo");

        panelTitulo.innerHTML = nombreEstacion;
        statOee.innerHTML = oee ? Number(oee).toFixed(1) + "%" : "Sin datos";
        statLeadtime.innerHTML = leadtime ? Number(leadtime).toFixed(1) + " hrs" : "Sin datos";
        statCiclo.innerHTML = ciclo ? Number(ciclo).toFixed(2) + " min" : "Sin datos";

        panel.classList.add("show");
    }

    if(panelCerrar){
        panelCerrar.addEventListener("click", function(){
            panel.classList.remove("show");
        });
    }

    // --- Raycasting para detectar clics sobre las estaciones ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    renderer.domElement.addEventListener("click", function(evento){

        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((evento.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((evento.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersecciones = raycaster.intersectObjects(meshesClickeables);

        if(intersecciones.length > 0){
            mostrarPanel(intersecciones[0].object.userData.nombreEstacion);
        }
    });

    // --- Animación ---
    function animar(){
        requestAnimationFrame(animar);
        controls.update();
        renderer.render(scene, camera);
    }

    animar();

    // --- Reajuste de tamaño ---
    window.addEventListener("resize", function(){
        const w = contenedor.clientWidth;
        const h = contenedor.clientHeight;
        if(w === 0 || h === 0) return;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });

})();