const btnIniciarDetener = document.querySelector("#btnIniciarDetener");
const btnReiniciar = document.querySelector("#btnReiniciar");
const btnGuardar = document.querySelector("#btnGuardar");

let segundos = 0;
let minutos = 0;
let horas = 0;

let mostrarSegundos = 0;
let mostrarMinutos = 0;
let mostrarHoras = 0;

let resultados = document.querySelector(".resultados");
let resultadosContador = 0;

let intervaloTemporizador = null;
let estadoTemporizador = "detenido";

function temporizador() {
  segundos++;
  if (segundos / 60 === 1) {
    segundos = 0;
    minutos++;

    if (minutos / 60 === 1) {
      minutos = 0;
      horas++;
    }
  }

  if (segundos < 10) {
    mostrarSegundos = `0${segundos.toString()}`;
  } else {
    mostrarSegundos = segundos;
  }
  if (minutos < 10) {
    mostrarMinutos = `0${minutos.toString()}`;
  } else {
    mostrarMinutos = minutos;
  }
  if (horas < 10) {
    mostrarHoras = `0${horas.toString()}`;
  } else {
    mostrarHoras = horas;
  }

  let mostrarTemporizador = (document.getElementById(
    "temporizador"
  ).innerText = `${mostrarHoras}:${mostrarMinutos}:${mostrarSegundos}`);
}

btnIniciarDetener.addEventListener("click", () => {
  if (estadoTemporizador === "detenido") {
    intervaloTemporizador = window.setInterval(temporizador, 1000);
    document.getElementById(
      "btnIniciarDetener"
    ).innerHTML = `<i class="fa-solid fa-pause" id="pausa"></i>`;
    estadoTemporizador = "iniciado";
  } else {
    window.clearInterval(intervaloTemporizador);
    document.getElementById(
      "btnIniciarDetener"
    ).innerHTML = `<i class="fa-solid fa-play" id="reproducir"></i>`;
    estadoTemporizador = "detenido";
  }
});

btnReiniciar.addEventListener("click", () => {
  window.clearInterval(intervaloTemporizador);
  segundos = 0;
  minutos = 0;
  horas = 0;

  document.getElementById("temporizador").innerHTML = `00:00:00`;
  document.getElementById(
    "btnIniciarDetener"
  ).innerHTML = `<i class="fa-solid fa-play" id="reproducir"></i>`;
  resultadosContador = 0;
  resultados.style.display = "none";
  resultados.innerHTML = "<h3>Resultados Guardados</h3>";
});

btnGuardar.addEventListener("click", () => {
  let resultados = document.querySelector(".resultados"); // selecciona el div resultados
  let temporizador = document.getElementById("temporizador");

  if (temporizador.innerText === "00:00:00") {
    return;
  }

  let nuevoResultado = document.createElement("p"); //crea un "p"
  let ultimoResultado = resultados.lastElementChild; // crea una variable con el ultimo elemento de resultados

  let ultimoTiempo;
  if (ultimoResultado) {
    ultimoTiempo = ultimoResultado.innerText.split(" - ")[1]; //si existe ultimoResultado, se divide en un array y se selecciona la parte que separa el " - ", por ejemplo si ultimoResultado es 1 - 00:00:01 se guarda el "00:00:01"
  } else {
    ultimoTiempo = ""; // si no existe, el valor queda como un string vacio
  } 

  let tiempoActual = temporizador.innerText;

  if (ultimoTiempo === tiempoActual) {
    return;
  }

  resultados.style.display = "block";
  resultadosContador++;
  nuevoResultado.innerText = `${resultadosContador} - ${tiempoActual}`;
  resultados.appendChild(nuevoResultado);
});
