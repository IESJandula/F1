    // Función asincrónica para cargar datos desde el archivo JSON
    async function cargarDatos() {
        try {
          const response = await fetch("../files/teams.json");
          const data = await response.json();
          const equipos = data; // Ajusta esto según la estructura real de tu JSON
          console.log(equipos);
          mostrarDatos(equipos);
          return equipos;
        } catch (error) {
          console.error("Error fetching or parsing JSON:", error);
          return null;
        }
      }
  
      // Función que se encarga de mostrar los datos en el HTML
      function mostrarDatos(equipos) {
        // Obtener la referencia del elemento con el id "equipos"
        var divEquipos = document.getElementById("equipos");
  
        // Crear las tarjetas
        for (var i = 0; i < equipos.length; i++) {
          // Crear un elemento <a> para la tarjeta
          var tarjeta = document.createElement("a");
          tarjeta.href = "#";
          tarjeta.className = "flex flex-col items-center bg-black border border-gray-200 rounded-lg shadow mb-4 mx-2 p-4 md:flex-row md:w-96 hover:bg-gray-700";
  
          // Crear un elemento <img> para el logo del equipo
          var logo = document.createElement('img');
          logo.className = "object-cover w-20 h-20 md:w-24 md:h-24";
          logo.src = equipos[i].logo;
          logo.alt = "Team Logo";
          tarjeta.appendChild(logo);
  
          // Crear un elemento <div> para el contenido de la tarjeta
          var contenido = document.createElement("div");
          contenido.className = "flex flex-col justify-between p-4 leading-normal";
  
          // Crear un elemento <h5> para el nombre del equipo
          var nombre = document.createElement("h5");
          nombre.className = "mb-2 text-4xl font-bold tracking-tight text-white";
          var textoNombre = document.createTextNode(equipos[i].name);
          nombre.appendChild(textoNombre);
          contenido.appendChild(nombre);
  
          // Crear un elemento <p> para la información del equipo
          var info = document.createElement("p");
          info.className = "mb-3 font-normal text-gray-700";
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
      }
  
      // Llamar a la función para cargar datos al cargar la página
      cargarDatos();
