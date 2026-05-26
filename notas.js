/*************************
 * BASE DE DATOS (FIJA)
 *************************/
 let alumnos = [
    { numero: 1, nombre: "Jesús Hernández Guio", evaluaciones: [] },
    { numero: 2, nombre: "Randy Ernesto Suárez Rodríguez", evaluaciones: [] },
    { numero: 3, nombre: "Daniel Zaldívar Figueredo", evaluaciones: [] },
    { numero: 4, nombre: "Yadiel Jorge Acosta Ricardo", evaluaciones: [] },
    { numero: 5, nombre: "Julio Alejandro Gámez Calzadilla", evaluaciones: [] },
    { numero: 6, nombre: "Daniel Alejandro Beliz Torres", evaluaciones: [] },
    { numero: 7, nombre: "Victor Manuel Maceira Mir", evaluaciones: [] },
];

/*************************
 * EVALUACIONES
 *************************/
const evaluaciones = [
    {
        nombre: "Evaluacion 1",
        fecha: "21/5/2026",
        descripcion: `
        Esta en el grupo de WhataApp :D
`,
        notas: {
            5: ["Daniel Zaldívar Figueredo","Victor Manuel Maceira Mir","Jesús Hernández Guio","Julio Alejandro Gámez Calzadilla","Yadiel Jorge Acosta Ricardo"," "]
            4: ["Randy Ernesto Suárez Rodríguez",]
        }
    },
    {
        nombre: "Pendiente",
        fecha: "24/5/2026",
        descripcion: `
        Bujaja
`,
        notas: {
            
            5: [],
            4: [],
            3: [],
            
        }
    }
];
/*************************
 * ASIGNAR NOTAS
 *************************/
evaluaciones.forEach(ev => {
    alumnos.forEach(al => {
        let nota = null;
        for (let n in ev.notas) {
            if (ev.notas[n].includes(al.nombre)) {
                nota = parseInt(n);
                break;
            }
        }
        al.evaluaciones.push({
            nombre: ev.nombre,
            fecha: ev.fecha,
            nota: nota,
            descripcion: ev.descripcion
        });
    });
});

/*************************
 * PROMEDIO
 *************************/
function calcularPromedio(alumno) {
    const notas = alumno.evaluaciones.filter(e => e.nota !== null).map(e => e.nota);
    if (notas.length === 0) return "—";
    return (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(2);
}

/*************************
 * TABLA PRINCIPAL
 *************************/
const tbody = document.querySelector("#tablaAlumnos tbody");

alumnos.forEach(al => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${al.numero}</td>
        <td>${al.nombre}</td>
        <td>${calcularPromedio(al)}</td>
        <td></td>
    `;
    tr.addEventListener("click", () => abrirModal(al));
    tbody.appendChild(tr);
});

/*************************
 * MODAL
 *************************/
function abrirModal(alumno) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("tituloAlumno").innerText = alumno.nombre;

    const detalle = document.getElementById("detalleNotas");
    detalle.innerHTML = "";

    alumno.evaluaciones.forEach(ev => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td style="cursor:pointer">${ev.nombre}</td>
            <td>${ev.fecha}</td>
            <td>${ev.nota !== null ? ev.nota : "⏳"}</td>
            <td>${calcularPromedio(alumno)}</td>
        `;
    
        tr.addEventListener("click", () => {
            const titulo = encodeURIComponent(ev.nombre);
            window.location.href = `evaluaciones.html?eval=${titulo}`;
        });
    
        detalle.appendChild(tr);
    });
    
}



function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}



/*************************
 * ORDENAR TABLA
 *************************/
 let ordenActual = {
    numero: true,
    nombre: true,
    promedio: true
};

function ordenarTabla(tipo) {

    alumnos.sort((a, b) => {

        let valA, valB;

        if (tipo === "numero") {
            valA = a.numero;
            valB = b.numero;
        }

        if (tipo === "nombre") {
            valA = a.nombre.toLowerCase();
            valB = b.nombre.toLowerCase();
        }

        if (tipo === "promedio") {
            valA = calcularPromedio(a) === "—" ? -1 : parseFloat(calcularPromedio(a));
            valB = calcularPromedio(b) === "—" ? -1 : parseFloat(calcularPromedio(b));
        }

        if (valA < valB) return ordenActual[tipo] ? -1 : 1;
        if (valA > valB) return ordenActual[tipo] ? 1 : -1;
        return 0;
    });

    ordenActual[tipo] = !ordenActual[tipo];

    renderizarTabla();
}



function abrirEvaluaciones() {
    window.location.href = "evaluaciones.html";
}


/*************************
 * REDIBUJAR TABLA
 *************************/
function renderizarTabla() {
    const tbody = document.querySelector("#tablaAlumnos tbody");
    tbody.innerHTML = "";

    alumnos.forEach(al => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${al.numero}</td>
            <td>${al.nombre}</td>
            <td>${calcularPromedio(al)}</td>
            <td></td>
        `;
        tr.addEventListener("click", () => abrirModal(al));
        tbody.appendChild(tr);
    });
}
