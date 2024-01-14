   ///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
      //     F  U  N  C  I  O  N      D  E       B  U  S  Q  U  E  D  A      //
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


async function buscarPilotos(terminoBusqueda) {
  try {
    // Realizar la petición al archivo JSON
    const peticion = await fetch('../files/ranking.json');

    if (!peticion.ok) {
      throw new Error(`Error ${peticion.status}`);
    }

    const ranking = await peticion.json();

    if (terminoBusqueda) {
      // Si se proporciona un término de búsqueda, filtrar los pilotos que coincidan
      const expresionRegular = new RegExp(`^${terminoBusqueda}`, 'i');
      const resultado = ranking.filter(piloto => expresionRegular.test(piloto.driver.name));
      console.log(resultado);
      return resultado;
    } else {
      // Si no se proporciona un término de búsqueda, retornar el ranking completo
      return ranking;
    }
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error.message);
    return null; // Retorna null en caso de un error
  }
}




async function buscarEquipos(terminoBusqueda) {
  try {
    // Realizar la petición al archivo JSON
    const peticion = await fetch('../files/teams.json');

    if (!peticion.ok) {
      throw new Error(`Error ${peticion.status}`);
    }

    const ranking = await peticion.json();

    if (terminoBusqueda) {
      // Si se proporciona un término de búsqueda, filtrar los pilotos que coincidan
      const expresionRegular = new RegExp(`^${terminoBusqueda}`, 'i');
      const resultado = ranking.filter(equipo => expresionRegular.test(equipo.name));
      console.log(resultado);
      return resultado;
    } else {
      // Si no se proporciona un término de búsqueda, retornar el ranking completo
      return ranking;
    }
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error.message);
    return null; // Retorna null en caso de un error
  }
}



async function buscarCircuitos(terminoBusqueda) {
  try {
    // Realizar la petición al archivo JSON
    const peticion = await fetch('../files/circuits.json');

    if (!peticion.ok) {
      throw new Error(`Error ${peticion.status}`);
    }

    const ranking = await peticion.json();

    if (terminoBusqueda) {
      // Si se proporciona un término de búsqueda, filtrar los pilotos que coincidan
      const expresionRegular = new RegExp(`^${terminoBusqueda}`, 'i');
      const resultado = ranking.filter(circuito => expresionRegular.test(circuito.circuit.name));
      console.log(resultado);
      return resultado;
    } else {
      // Si no se proporciona un término de búsqueda, retornar el ranking completo
      return ranking;
    }
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error.message);
    return null; // Retorna null en caso de un error
  }
}
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//     F  U  N  C  I  O  N      D  E       R  E  P  R  E  S  E  N  T  A  C  I  O  N      //
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////



async function listarPilotos(resultado) {
  let ranking;

  if (!resultado) {
    // Si no hay resultados, realizar la búsqueda completa
    ranking = await buscarPilotos();
  } else {
    ranking = resultado;
  }

  const pilotosContainer = document.getElementById('pilotos');
  pilotosContainer.innerHTML = '';

  pilotosContainer.classList.add('flex', 'flex-wrap', 'justify-start', 'piloto', 'w-full', 'lg:w-1/2');

  if (ranking && ranking.length > 0 && pilotosContainer) {
    ranking.forEach(piloto => {
      const contenedorPiloto = document.createElement('div');

      const tarjetaPiloto = document.createElement('a');
      tarjetaPiloto.href = '#';
      tarjetaPiloto.classList.add(
        'flex', 'flex-col', 'items-center', 'bg-black', 'border', 'border-gray-200', 'rounded-lg', 'shadow',
        'md:flex-row', 'md:max-w-xl', 'hover:bg-gray-700', 'mx-2'
      );

      const imagenPiloto = document.createElement('img');
      imagenPiloto.classList.add(
        'object-cover', 'w-full', 'rounded-t-lg', 'h-96', 'md:h-auto', 'md:w-48', 'md:rounded-none', 'md:rounded-s-lg'
      );
      imagenPiloto.src = piloto.driver.image;

      const contenidoTarjeta = document.createElement('div');
      contenidoTarjeta.classList.add('flex', 'flex-col', 'justify-between', 'p-4', 'leading-normal');

      const tituloPiloto = document.createElement('h5');
      tituloPiloto.classList.add('mb-2', 'text-2xl', 'font-bold', 'tracking-tight', 'text-white');
      tituloPiloto.textContent = piloto.driver.name;

      const infoPiloto = document.createElement('p');
      infoPiloto.classList.add('parrafo');
      infoPiloto.innerHTML = `Equipo del Piloto: ${piloto.team.name} <p>Ranking: ${piloto.position} </p><p>Carreras ganadas: ${piloto.wins}</p>`;

      contenidoTarjeta.appendChild(tituloPiloto);
      contenidoTarjeta.appendChild(infoPiloto);
      tarjetaPiloto.appendChild(imagenPiloto);
      tarjetaPiloto.appendChild(contenidoTarjeta);

      contenedorPiloto.appendChild(tarjetaPiloto);
      pilotosContainer.appendChild(contenedorPiloto);
    });
  }
}
async function listarEquipos(equipos){
  ////////////empieza contenido//////
  var divEquipos = document.getElementById("pilotos");
  divEquipos.innerHTML = '';
  
  // Crear las tarjetas
  for (var i = 0; i < equipos.length; i++) {
    // Crear un elemento <a> para la tarjeta
    var tarjeta = document.createElement("a");
    tarjeta.href = "#";
    tarjeta.className = "flex flex-col items-center bg-black border border-gray-200 rounded-lg shadow mb-4 mx-2 p-4 md:flex-row md:w-96 hover:bg-gray-700 flex-equipo";

    // Crear un elemento <img> para el logo del equipo
    var logo = document.createElement('img');
    logo.className = "object-cover w-20 h-20 md:w-24 md:h-24";
    logo.src = equipos[i].logo;
    logo.alt = "Team Logo";
    tarjeta.appendChild(logo);

    // Crear un elemento <div> para el contenido de la tarjeta
    var contenido = document.createElement("div");
    contenido.className = "flex flex-col justify-between p-4 leading-normal flex-equipo";

    // Crear un elemento <h5> para el nombre del equipo
    var nombre = document.createElement("h5");
    nombre.className = "mb-2 text-4xl font-bold tracking-tight text-white";
    var textoNombre = document.createTextNode(equipos[i].name);
    nombre.appendChild(textoNombre);
    contenido.appendChild(nombre);

    // Crear un elemento <p> para la información del equipo
    var info = document.createElement("p");
    info.className = 'parrafo';
    var textoInfo = document.createTextNode(
      "Base: " + equipos[i].base +
      "<br />Año de entrada: " + equipos[i].first_team_entry +
      "<br />Campeonatos del mundo: " + equipos[i].world_championships +
      "<br />Posición más alta en una carrera: " + equipos[i].highest_race_finish.position +
      " (Número: " + equipos[i].highest_race_finish.number + ")" +
      "<br />Pole Positions: " + equipos[i].pole_positions +
      "<br />Vueltas más rápidas: " + equipos[i].fastest_laps +
      "<br />Presidente: " + equipos[i].president +
      "<br />Director: " + equipos[i].director +
      "<br />Gerente Técnico: " + equipos[i].technical_manager +
      "<br />Chasis: " + equipos[i].chassis +
      "<br />Motor: " + equipos[i].engine +
      "<br />Neumáticos: " + equipos[i].tyres
    );
    info.innerHTML = textoInfo.textContent;
    contenido.appendChild(info);

    // Agregar el contenido al elemento de la tarjeta
    tarjeta.appendChild(contenido);

    // Agregar la tarjeta al contenedor principal
    divEquipos.appendChild(tarjeta);
  }

  //////////finaliza contenido/////
}

async function listarCircuitos(circuitos){
  ///////inicia////////
  var divCircuitos = document.getElementById("pilotos");
  divCircuitos.innerHTML = '';

  // Crear las tarjetas
  for (var i = 0; i < circuitos.length; i++) {
      // Crear un elemento <a> para la tarjeta
      var tarjeta = document.createElement("a");
      tarjeta.href = "#";
      tarjeta.className = "flex flex-col items-center bg-black border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-700 mx-2 ";

      // Crear un elemento <img> para la imagen del circuito
      var imagen = document.createElement('img');
      imagen.className = "object-cover w-56 h-56 md:w-56 md:h-56 md:rounded-none md:rounded-l-lg";
      imagen.src = circuitos[i].circuit.image;
      imagen.alt = "image_circuit";
      tarjeta.appendChild(imagen);

      // Crear un elemento <div> para el contenido de la tarjeta
      var contenido = document.createElement("div");
      contenido.className = "flex flex-col justify-between p-4 leading-normal w-56";

      // Crear un elemento <h5> para el nombre del circuito
      var nombre = document.createElement("h5");
      nombre.className = "mb-2 text-2xl font-bold tracking-tight text-white";
      var textoNombre = document.createTextNode(circuitos[i].circuit.name);
      nombre.appendChild(textoNombre);
      contenido.appendChild(nombre);

      // Crear un elemento <p> para la información del circuito (país y ciudad)
      var info = document.createElement("p");
      info.className = 'parrafo';
      var textoInfo = document.createTextNode("País: " + circuitos[i].competition.location.country + "<br />Ciudad: " + circuitos[i].competition.location.city);
      info.innerHTML = textoInfo.textContent;
      contenido.appendChild(info);

      // Agregar el contenido al elemento de la tarjeta
      tarjeta.appendChild(contenido);

      // Agregar la tarjeta al contenedor principal
      divCircuitos.appendChild(tarjeta);
  }
  //////finaliza//////
}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//     E  V  E  N  T  O  S       D   E      E  S  C  U  C  H  A     //
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


window.addEventListener('load', async function () {

  // Cuando la página se carga, quiero que se listen los pilotos
  const resultadosPiloto = await buscarEquipos();                 ////////modificar por lo que toque se vaya a mostrar en la pagina
  listarEquipos(resultadosPiloto);                                 ////////modificar por lo que toque se vaya a mostrar en la pagina

  // Quiero que se escuche al buscador
  const searchInput = document.getElementById('search-dropdown');

  searchInput.addEventListener('input', async function (event) {
    const terminoBusqueda = event.target.value.trim().toLowerCase();

    // Si tenemos criterio en el buscador...
    if (terminoBusqueda) {
      // Que busque primero por piloto
      const resultadosPiloto = await buscarPilotos(terminoBusqueda);

      // Si la búsqueda de pilotos da fruto, que imprima pilotos
      if (resultadosPiloto && resultadosPiloto.length > 0) {
        // Procesar los resultados de pilotos
        console.log(resultadosPiloto);
        listarPilotos(resultadosPiloto);
      } else {
        // Si no encuentra en pilotos, puedes manejarlo aquí
        const resultadoEquipos = await buscarEquipos(terminoBusqueda);
        if(resultadoEquipos && resultadoEquipos.length > 0){
            console.log(resultadoEquipos);
            listarEquipos(resultadoEquipos);
        }else{
          const resultadoCircuitos = await buscarCircuitos(terminoBusqueda);
          if( resultadoCircuitos && resultadoCircuitos.length > 0){
            console.log(resultadoCircuitos);
            listarCircuitos(resultadoCircuitos);
          }else{
            //si el criterio de busqueda no coincide con nada listo todos los pilotos
            const resultadosPiloto = await buscarEquipos();                 ////////modificar por lo que toque se vaya a mostrar en la pagina
  listarEquipos(resultadosPiloto);                         ///////si no busca nada que muestr lo que toque en la pagina
          }
        }
      }
    } else {
      // Si no hay criterio de búsqueda, listar todos los pilotos
      const resultadosPiloto = await buscarEquipos();                 ////////modificar por lo que toque se vaya a mostrar en la pagina
      listarEquipos(resultadosPiloto);                                    ///////si no busca nada que muestr lo que toque en la pagina
    }
  });
});
