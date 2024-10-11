"use strict";

/*
 * Sanchez Ordoñez, Margoth Valeria
 */

// Variables creadas para los prompts
let discoCargado = "";
let autorObanda = "";
let codigoDisco = "";
let nombrePistasDisco = "";
let duracionPistasDisco = "";

// Varable generada para el boton de eleccion de codigo
let codigoDiscoEncontrado = "";

// Array que almacenará los discos agregados por el usuario:
let discos = [];

// Función que solicita los datos del disco al usuario y lo guarda (es la que se invoca cuando se clickea el boton para cargar discos):
const cargarNuevoDisco = () => {
  // Nombre Disco
  do {
    discoCargado = prompt("Ingresa el nombre del disco");
    if (!isNaN(discoCargado)) {
      alert("Debe cargar un texto");
    }
  } while (!isNaN(discoCargado));

  // Autor banda
  do {
    autorObanda = prompt("Ingresa el nombre del autor o la banda");
    if (!isNaN(autorObanda)) {
      alert("Debe cargarun texto");
    }
  } while (!isNaN(autorObanda));

  // Codigo Disco
  do {
    codigoDisco = parseInt(prompt("Código numérico único del disco:"));
    if (isNaN(codigoDisco) || codigoDisco < 1 || codigoDisco > 999) {
      alert("Debe cargar unicamente números mayores a 1 y menores a 999");
    } else if (discos.some((num) => num.codigo === codigoDisco)) {
      alert("El codigo ya existe. Ingrese un nuevo codigo");
      codigoDisco = 0; // le pongo 0 para que vuelva al while a pedir un valor nuevo (ya que de otra forma el codigo esta entre 1 y 999 y se iria del while)
    }
  } while (isNaN(codigoDisco) || codigoDisco < 1 || codigoDisco > 999);

  //Variable nueva pista y array que contiene las pistas
  let agregarOtraPista = "si"; // inicializo esta variable en si para que en la primera iteracion entre en el while

  // array donde voy a almacenar el objeto de las pistas con el nombre y duracion
  let pista = [];

  //consulta si desea ingresar una nueva pista
  while (agregarOtraPista.toLowerCase() === "si") {
    do {
      alert("Debe ingresar las pistas del disco y su tiempo de duración.");
      nombrePistasDisco = prompt("Ingrese el nombre de la pista");
      if (!isNaN(nombrePistasDisco)) {
        alert("Debe cargar unicamente un texto");
      }
    } while (!isNaN(nombrePistasDisco));

    //Duración pista
    do {
      duracionPistasDisco = parseFloat(
        prompt(
          "Ingresa la duración de la pista en segundo. debe estar entre 0 y 7200 segundos"
        )
      );
      if (isNaN(duracionPistasDisco) || duracionPistasDisco < 0) {
        alert("Debe cargar unicamente números");
      }
    } while (
      isNaN(duracionPistasDisco) ||
      duracionPistasDisco < 0 ||
      duracionPistasDisco > 7200
    );

    do {
      agregarOtraPista = prompt(
        "¿Quieres agregar otra pista? (Escribe 'si' o 'no')"
      ).toLowerCase();
    } while (agregarOtraPista !== "si" && agregarOtraPista !== "no");

    //Genero el objeto de pista con el nombre y la duracion
    let pistaObjeto = {
      nombre: nombrePistasDisco,
      duracion: duracionPistasDisco,
    };

    // pusheo el objeto al array de pista para acumular todas las pistas
    pista.push(pistaObjeto);
  }

  alert("Has terminado de ingresar pistas.");

  //Genero el objeto de discoNuevo con todos los datos ingresados por el usuario
  let discoNuevo = {
    disco: discoCargado,
    autor: autorObanda,
    codigo: codigoDisco,
    pistas: pista,
  };

  // lo pusheo al array de discos
  discos.push(discoNuevo);
};

// Función que recorre todos los discos y los muestra en la etiqueta #respuesta:
const mostrarDiscos = () => {
  // Variable que almacenará el contenido a mostrar dentro de #respuesta:
  let respuesta = "";
  //Recorro array discos y agrego las funciones de cantidad de pistas, duracion total y mayor duración (llama a algunas funciones definidas mas abajo para calcular las estadisticas)
  discos.forEach((discoObjeto, indice) => {
    respuesta += ` <li>
          <h2>DISCO ${indice + 1} ${discoObjeto.disco}</h2>
          <p>Autor: ${discoObjeto.autor}</p>
          <p>Código: ${discoObjeto.codigo}</p>
           <h3>Estadisticas del disco </h2>
          <p>Cantidad pistas disco: ${cantidadPistasDisco(discoObjeto)}</p>
          <p>Duracion pistas disco: ${duracionTotDisco(discoObjeto)}</p> 
          <p>Duracion promedio disco: ${Math.round(
            duracionTotDisco(discoObjeto) / cantidadPistasDisco(discoObjeto) //Duración promedio
          )}</p> 
          <p>Pista con mayor tiempo de duración  disco: ${mayorDuracion(
            discoObjeto
          )}</p>  
          `; //Duración mayor

    // Recorro discos y agrego el nombre de pista y la duración (en la duracion se cambio el estilo a rojo si la misma es mayor a 180)
    discoObjeto.pistas.forEach((pista, indice) => {
      respuesta += ` 
          <h4>Pista ${indice + 1}:</h4>
            <ul>
            <li>Nombre ${pista.nombre}</li>             
           <li  style="color: ${
             pista.duracion > 180 ? "red" : "black"
           };">Duración ${pista.duracion} seg</li>   </ul>`;
    });
    respuesta += ` </ul>`;
  });

  // Sentencia que busca la etiqueta #respuesta y le cambia el contenido interno por la variable "respuesta"
  document.getElementById("respuesta").innerHTML = respuesta;
};

//Funcion mostrar todos los datos del disco seleccionado usando un codigo que le voy a pedir al usuario
const mostrarDiscoCodigo = () => {
  do {
    codigoDisco = parseInt(prompt("Código numérico único del disco:"));
    if (isNaN(codigoDisco) || codigoDisco < 1 || codigoDisco > 999) {
      alert("Debe cargar unicamente números mayores a 1 y menores a 999");
    }
  } while (isNaN(codigoDisco) || codigoDisco < 1 || codigoDisco > 999);
  let respuesta = "";
  if (discos.some((num) => num.codigo === codigoDisco)) {
    // se usa some para ver si existe algun disco con ese codigo, el some devuelve True si lo encuntra y False si no lo encuntra
    const discoEncontrado = discos.find((num) => num.codigo === codigoDisco); // en el caso de encontrar el codigo con some uso find para que me devuelva el objeto del disco en cuestio
    respuesta += ` <li>
          <h2>DISCO ${discoEncontrado.disco}</h2>
          <p>AUTOR ${discoEncontrado.autor}</p>
          <p>Código: ${discoEncontrado.codigo}</p>
`;

    discoEncontrado.pistas.forEach((pista, indice) => {
      respuesta += ` 
          <h4>Pista ${indice + 1}:</h4>
            <ul>
            <li>NOMBRE ${pista.nombre}</li>             
           <li  style="color: ${
             pista.duracion > 180 ? "red" : "black"
           };">DURACIÓN ${pista.duracion} seg</li>   
             
           </ul>`;
    });
    respuesta += ` </ul>`;
    document.getElementById("respuesta").innerHTML = respuesta;
  } else {
    alert(
      "El codigo ingresado no es un codigo de un disco, prueba nuevamente mas tarde"
    );
  }
};

// Funcion que devuelve la cantidad de pistas que tiene cada disco (como argumento tiene un objeto ya que lo voy a usar dentro del foreach en mostrar disco)
const cantidadPistasDisco = (discoOb) => {
  return discoOb.pistas.length;
};

// Funcion que devuelve la duracion total de cada disco (como argumento pide un objeto al igual que el anterior)
const duracionTotDisco = (discoOb) => {
  let duracionTotal = 0;
  discoOb.pistas.forEach((pista) => {
    duracionTotal += pista.duracion;
  });
  return duracionTotal;
};

/// Funcion que devuelve la pista con mayor de la pista de un disco
const mayorDuracion = (discoOb) => {
  let duracionMayor = 0;
  let pistaNombre = "";
  discoOb.pistas.forEach((pista) => {
    if (pista.duracion > duracionMayor) {
      duracionMayor = pista.duracion;
      pistaNombre = pista.nombre;
    }
  });
  return pistaNombre;
};
