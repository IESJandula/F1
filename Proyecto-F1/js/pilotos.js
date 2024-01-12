/**
 * Esta clase es el controlador de la vista pilotos, se encarga de realizar la petición a la API y mostrar los datos
 * @author Silvia Mesa
 */

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
      infoPiloto.classList.add('mb-3', 'font-normal', 'text-gray-700');
      infoPiloto.innerHTML = `Equipo del Piloto: ${piloto.team.name} \nRanking: ${piloto.position} \nCarreras ganadas: ${piloto.wins}`;

      contenidoTarjeta.appendChild(tituloPiloto);
      contenidoTarjeta.appendChild(infoPiloto);
      tarjetaPiloto.appendChild(imagenPiloto);
      tarjetaPiloto.appendChild(contenidoTarjeta);

      contenedorPiloto.appendChild(tarjetaPiloto);
      pilotosContainer.appendChild(contenedorPiloto);
    });
  }
}



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//     E  V  E  N  T  O  S       D   E      E  S  C  U  C  H  A     //
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


window.addEventListener('load', async function () {

  // Cuando la página se carga, quiero que se listen los pilotos
  const resultadosPiloto = await buscarPilotos();
  listarPilotos(resultadosPiloto);

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
            //listarEquipos(resultadoEquipos);
        }else{
          const resultadoCircuitos = await buscarCircuitos(terminoBusqueda);
          if( resultadoCircuitos && resultadoCircuitos.length > 0){
            console.log(resultadoCircuitos);
            //listarCircuitos(resultadoCircuitos);
          }else{
            //si el criterio de busqueda no coincide con nada listo todos los pilotos
            const resultadosPiloto = await buscarPilotos();
            listarPilotos(resultadosPiloto);
          }
        }
      }
    } else {
      // Si no hay criterio de búsqueda, listar todos los pilotos
      const resultadosPiloto = await buscarPilotos();
      listarPilotos(resultadosPiloto);
    }
  });
});

