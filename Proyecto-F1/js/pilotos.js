/**
 * Esta clase es el controlador de la vista pilotos, se encarga de realizar la peticion a la API, y mostrar los datos
 * @author Silvia Mesa
 */
async function cargarDatos() {
  try {

      const peticion = await fetch('../files/ranking.json');
      if (!peticion.ok) {
        throw `Error ${peticion.status}`;
      }
      const ranking = await peticion.json();

      console.log(ranking);

      return ranking;

       // Return the parsed JSON data
  } catch (error) {

      console.error("Error fetching or parsing JSON:", error);
      return null; // Return null in case of an error

  };
};
async function listarPilotos(){
    let ranking = await cargarDatos();
    const pilotosContainer = document.getElementById('pilotos');
  
    if (ranking && ranking.length > 0) {
      for (const piloto of ranking) {
        // Crear un contenedor para cada piloto
        const contenedorPiloto = document.createElement('div');
        contenedorPiloto.classList.add('flex', 'flex-wrap', 'justify-center', 'piloto','w-full','lg:w-1/2'); // Agregar clases aquí
  
        // Crear una tarjeta para cada piloto
        const tarjetaPiloto = document.createElement('a');
        tarjetaPiloto.href = '#';
        tarjetaPiloto.classList.add(
          'flex',
          'flex-col',
          'items-center',
          'bg-black',
          'border',
          'border-gray-200',
          'rounded-lg',
          'shadow',
          'md:flex-row',
          'md:max-w-xl',
          'hover:bg-gray-700',
          'mx-2'
        );
  
        // Crear imagen del piloto
        const imagenPiloto = document.createElement('img');
        imagenPiloto.classList.add(
          'object-cover',
          'w-full',
          'rounded-t-lg',
          'h-96',
          'md:h-auto',
          'md:w-48',
          'md:rounded-none',
          'md:rounded-s-lg'
        );
        imagenPiloto.src = piloto.driver.image;
  
        // Crear contenido de la tarjeta
        const contenidoTarjeta = document.createElement('div');
        contenidoTarjeta.classList.add('flex', 'flex-col', 'justify-between', 'p-4', 'leading-normal');
  
        // Crear título del piloto
        const tituloPiloto = document.createElement('h5');
        tituloPiloto.classList.add('mb-2', 'text-2xl', 'font-bold', 'tracking-tight', 'text-white');
        tituloPiloto.textContent = piloto.driver.name;
  
        // Crear información del piloto
        const infoPiloto = document.createElement('p');
        infoPiloto.classList.add('mb-3', 'font-normal', 'text-gray-700');
        infoPiloto.innerHTML = `Equipo del Piloto: ${piloto.team.name} <br /> Ranking: ${piloto.position} <br /> Carreras ganadas: ${piloto.wins}`;
  
        // Agregar elementos a la tarjeta
        contenidoTarjeta.appendChild(tituloPiloto);
        contenidoTarjeta.appendChild(infoPiloto);
        tarjetaPiloto.appendChild(imagenPiloto);
        tarjetaPiloto.appendChild(contenidoTarjeta);
  
        // Agregar tarjeta al contenedor de pilotos
        contenedorPiloto.appendChild(tarjetaPiloto);
        pilotosContainer.appendChild(contenedorPiloto);
      }
    }

};



// Llama a la función para cargar datos al cargar la página*/

window.addEventListener('load',function(){
    listarPilotos();

})

