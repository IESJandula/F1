/**
 * Esta clase es el controlador de la vista pilotos, se encarga de realizar la petición a la API y mostrar los datos
 * @author Silvia Mesa
 */

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
      //     COMIENZO    DEL    BLOQUE    DE    BUSQUEDA      //
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


async function buscarPiloto(terminoBusqueda) {
  try {
    // Crear una expresión regular con el término de búsqueda
    const expresionRegular = new RegExp(`^${terminoBusqueda}`, 'i');

    // Realizar la petición al archivo JSON
    const peticion = await fetch('../files/ranking.json');

    if (!peticion.ok) {
      throw new Error(`Error ${peticion.status}`);
    }

    const ranking = await peticion.json();

    // Filtrar los pilotos que coincidan con la expresión regular
    const resultado = ranking.filter(piloto => expresionRegular.test(piloto.driver.name));

    // Procesar el resultado según la estructura de tus datos
    console.log(resultado);
    listarPiloto(resultado);
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error.message);
    return null; // Retorna null en caso de un error
  }
};





async function buscarCircuito(terminoBusqueda) {
  try {
    // Crear una expresión regular con el término de búsqueda
    const expresionRegular = new RegExp(`^${terminoBusqueda}`, 'i');

    // Realizar la petición al archivo JSON
    const peticion = await fetch('../files/circuits.json');

    if (!peticion.ok) {
      throw new Error(`Error ${peticion.status}`);
    }

    const circuitos = await peticion.json();

    // Filtrar los pilotos que coincidan con la expresión regular
    const resultado = circuitos.filter(circuito => expresionRegular.test(circuito.circuit.name));

    // Procesar el resultado según la estructura de tus datos
    return resultado;
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error.message);
    return null; // Retorna null en caso de un error
  }
};





async function buscarEquipo(terminoBusqueda) {
  try {
    // Crear una expresión regular con el término de búsqueda
    const expresionRegular = new RegExp(`^${terminoBusqueda}`, 'i');

    // Realizar la petición al archivo JSON
    const peticion = await fetch('../files/teams.json');

    if (!peticion.ok) {
      throw new Error(`Error ${peticion.status}`);
    }

    const equipos = await peticion.json();

    // Filtrar los pilotos que coincidan con la expresión regular
    const resultado = equipos.filter(equipo => expresionRegular.test(equipos.name));

    // Procesar el resultado según la estructura de tus datos
    return resultado;
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error.message);
    return null; // Retorna null en caso de un error
  }
};





async function buscarPilotos() {
  try {
    const peticion = await fetch('../files/ranking.json');
    
    if (!peticion.ok) {
      throw new Error(`Error ${peticion.status}`);
    }

    const ranking = await peticion.json();
    console.log(ranking);

    return ranking;

  } catch (error) {
    console.error("Error fetching or parsing JSON:", error.message);
    return null; // Retorna null en caso de un error
  }
}


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
      //     COMIENZO     DEL    BLOQUE     DE      IMPRESION    //
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


async function listarPilotos() {
  let ranking = await buscarPilotos();
  const pilotosContainer = document.getElementById('pilotos');
  pilotosContainer.classList.add('flex', 'flex-wrap', 'justify-start', 'piloto', 'w-full', 'lg:w-1/2')

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
      infoPiloto.textContent = `Equipo del Piloto: ${piloto.team.name} \nRanking: ${piloto.position} \nCarreras ganadas: ${piloto.wins}`;

      contenidoTarjeta.appendChild(tituloPiloto);
      contenidoTarjeta.appendChild(infoPiloto);
      tarjetaPiloto.appendChild(imagenPiloto);
      tarjetaPiloto.appendChild(contenidoTarjeta);

      contenedorPiloto.appendChild(tarjetaPiloto);
      pilotosContainer.appendChild(contenedorPiloto);
    });
  }
};





async function listarPiloto(resultado){
  let ranking = resultado;
  const pilotosContainer = document.getElementById('pilotos');
  pilotosContainer.innerHTML = ''; 

  pilotosContainer.classList.add('flex', 'flex-wrap', 'justify-start', 'piloto', 'w-full', 'lg:w-1/2')

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
      infoPiloto.textContent = `Equipo del Piloto: ${piloto.team.name} \nRanking: ${piloto.position} \nCarreras ganadas: ${piloto.wins}`;

      contenidoTarjeta.appendChild(tituloPiloto);
      contenidoTarjeta.appendChild(infoPiloto);
      tarjetaPiloto.appendChild(imagenPiloto);
      tarjetaPiloto.appendChild(contenidoTarjeta);

      contenedorPiloto.appendChild(tarjetaPiloto);
      pilotosContainer.appendChild(contenedorPiloto);
    });
  }
}

async function listarEquipos(){

}

async function listarCircuitos(){

}






window.addEventListener('load', function () {
  // Cuando la página se carga, quiero que se listen los pilotos
  listarPilotos();

  // Quiero que se escuche al buscador
  const searchInput = document.getElementById('search-dropdown');

  searchInput.addEventListener('input', async function (event) {
    const terminoBusqueda = event.target.value.trim().toLowerCase();
    
    // Si tenemos criterio en el buscador...
    if (terminoBusqueda) {
      // Que busque primero por piloto
      const resultadosPiloto = await buscarPiloto(terminoBusqueda);
      
      // Si la búsqueda de pilotos da fruto, que imprima pilotos
      if (resultadosPiloto && resultadosPiloto.length > 0) {
        // Procesar los resultados de pilotos
        console.log(resultadosPiloto);
        listarPiloto(resultadosPiloto);
      } else {
        // Si no encuentra en pilotos, que busque en circuitos
        const resultadosCircuito = await buscarCircuito(terminoBusqueda);
        
        if (resultadosCircuito && resultadosCircuito.length > 0) {
          // Procesar los resultados de circuitos
          console.log(resultadosCircuito);
          //listarCircuito(resultadosCircuito); // Agregar función para mostrar circuitos
        } else {
          // Si no encuentra en circuitos, que busque en los equipos
          const resultadosEquipo = await buscarEquipo(terminoBusqueda);
          
          // Y por último, si no encuentra en equipos, que liste los pilotos (todos)
          if (resultadosEquipo && resultadosEquipo.length > 0) {
            // Procesar los resultados de equipos
            console.log(resultadosEquipo);
          } else {
            // Si no hay resultados en ninguna categoría, puedes manejarlo aquí
            listarPilotos();
          }
        }
      }
    } else {
      // Si no hay criterio de búsqueda, listar todos los pilotos
      listarPilotos();
    }
  });
});

