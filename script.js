const ramos = {
    "Cálculo I": [],
    "Álgebra": [],
    "Geometría analítica y vectorial": [],
    "Antropología Cristiana": [],

    "Cálculo II": ["Cálculo I"],
    "Álgebra lineal I": ["Álgebra", "Geometría analítica y vectorial"],
    "Programación": [],
    "Ética cristiana": [],
    "Formación fundamental I": [],

    "Cálculo III": ["Cálculo II"],
    "Estadística I": ["Cálculo II"],
    "Métodos numéricos y ecuaciones diferenciales": ["Cálculo II", "Programación"],
    "Teoría de números": ["Álgebra"],
    "Análisis real": ["Cálculo III"],

    "Estructuras algebraicas I": ["Teoría de números"],
    "Didáctica del cálculo": ["Análisis real"],
    "Didáctica de los sistemas numéricos": ["Estructuras algebraicas I"],
    "Geometría euclidiana plana": [],
    "Estadística II": ["Estadística I"],

    "Didáctica de la estadística": ["Estadística I"],
    "Didáctica de la geometría": ["Didáctica del cálculo", "Geometría 3D y Geometría no euclidiana"],
    "Geometría 3D y Geometría no euclidiana": ["Geometría euclidiana plana"],
    "Inglés I": [],
    "Inglés II": ["Inglés I"],
    "Inglés III": ["Inglés II"],
    "Inglés IV": ["Inglés III"],

    "Trabajo de título": ["Uso de tecnologías para la enseñanza y aprendizaje de la matemática"],
    "Práctica docente final": ["Práctica comunitaria", "Historia y epistemología de la matemática", "Trabajo de título"]
};

let estado = JSON.parse(localStorage.getItem("estadoRamos")) || {};

const malla = document.getElementById("malla");

function puedeDesbloquear(ramo) {
    return ramos[ramo].every(req => estado[req] === "aprobado");
}

function crearMalla() {
    malla.innerHTML = "";

    for (let ramo in ramos) {
        const div = document.createElement("div");
        div.classList.add("ramo");
        div.textContent = ramo;

        if (estado[ramo] === "aprobado") {
            div.classList.add("aprobado");
        } else if (!puedeDesbloquear(ramo)) {
            div.classList.add("bloqueado");
        }

        div.onclick = () => aprobarRamo(ramo);
        malla.appendChild(div);
    }
}

function aprobarRamo(ramo) {
    if (!puedeDesbloquear(ramo)) return;
    estado[ramo] = "aprobado";
    localStorage.setItem("estadoRamos", JSON.stringify(estado));
    crearMalla();
}

crearMalla();
