import React, { useState, useEffect } from "react";
import "./index.css"; // Asegúrate de que esta importación sea correcta según la estructura de tu proyecto

const App = () => {
  const [numeroSecreto, setNumeroSecreto] = useState(0);
  const [intentos, setIntentos] = useState(0);
  const [listaNumerosSorteados, setListaNumerosSorteados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [numeroMaximo, setNumeroMaximo] = useState(10);
  const [numeroDeUsuario, setNumeroDeUsuario] = useState("");
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [fondo, setFondo] = useState(
    "bg-gradient-to-b from-blue-700 to-gray-900"
  );

  useEffect(() => {
    condicioneIniciales();
  }, []);

  const asignarTextoElemento = (texto) => {
    setMensaje(texto);
  };

  const generarNumeroSecreto = () => {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    if (listaNumerosSorteados.length === numeroMaximo) {
      asignarTextoElemento("Ya se sortearon todos los números posibles");
      setJuegoTerminado(true);
    } else {
      if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
      } else {
        setListaNumerosSorteados((prev) => [...prev, numeroGenerado]);
        return numeroGenerado;
      }
    }
  };

  const verificarIntento = () => {
    let numeroDeusuarioInt = parseInt(numeroDeUsuario);
    if (numeroDeusuarioInt === numeroSecreto) {
      asignarTextoElemento(
        `Has acertado en ${intentos} ${intentos === 1 ? "vez" : "veces"}`
      );
      setJuegoTerminado(true);
      setFondo("fondo-verde");
    } else {
      if (numeroDeusuarioInt > numeroSecreto) {
        asignarTextoElemento("El número secreto es menor");
      } else {
        asignarTextoElemento("El número secreto es mayor");
      }
      setIntentos(intentos + 1);
      limpiarJuego();
    }
  };

  const limpiarJuego = () => {
    setNumeroDeUsuario("");
  };

  const condicioneIniciales = () => {
    asignarTextoElemento(`Introduce un número del 1 al ${numeroMaximo}`);
    setNumeroSecreto(generarNumeroSecreto());
    setIntentos(1);
    setJuegoTerminado(false);
    setListaNumerosSorteados([]);
    setFondo("fondo-rosa");
  };

  const reiniciarJuego = () => {
    limpiarJuego();
    condicioneIniciales();
  };

  return (
    <div className={`flex items-center justify-center h-screen ${fondo}`}>
      <div className="relative flex flex-col items-center justify-between w-full max-w-5xl p-4 space-y-4 bg-opacity-75 sm:space-y-0 sm:flex-row">
        <div className="flex flex-col items-center w-full p-4 space-y-4 sm:w-2/3">
          <h1 className="text-4xl font-bold text-white sm:text-6xl texto-monospace">
            Juego del número secreto
          </h1>
          <p className="text-lg text-white texto-monospace sm:text-2xl">
            {mensaje}
          </p>
          <input
            type="number"
            min={1}
            max={numeroMaximo}
            id="valorDeUsuario"
            value={numeroDeUsuario}
            onChange={(e) => setNumeroDeUsuario(e.target.value)}
            className="w-full h-16 px-4 py-2 text-2xl   bg-white rounded-lg  focus:outline-none text-morado"
          />
          <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <button
              onClick={verificarIntento}
              className="w-full px-4 py-2 text-2xl font-bold text-white fondo-morado texto-monospace rounded-lg focus:outline-none"
            >
              Intentar
            </button>
            <button
              id="reiniciar"
              onClick={reiniciarJuego}
              className={`w-full px-4 py-2 text-2xl font-bold text-white rounded-lg texto-monospace focus:outline-none ${
                juegoTerminado ? "fondo-rosa" : "bg-gray-500"
              }`}
              disabled={!juegoTerminado}
            >
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
