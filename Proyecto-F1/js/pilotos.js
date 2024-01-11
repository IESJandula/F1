async function cargarDatos() {
  try {
      const response = await fetch("files/ranking.json");
      const pilotos = await response.json();
      console.log(pilotos);
      return pilotos; // Return the parsed JSON data
  } catch (error) {
      console.error("Error fetching or parsing JSON:", error);
      return null; // Return null in case of an error
  }
}

async function buscarPilotos(query) {
  try {
      const data = await cargarDatos();

      if (!data) {
          return;
      }

      const resultadosFiltrados = data.filter((piloto) =>
          piloto.driver.name.toLowerCase().includes(query.toLowerCase())
      );

      const resultsContainer = document.getElementById("results-container");
      resultsContainer.innerHTML = "";

      resultadosFiltrados.forEach((piloto) => {
          const pilotoCard = `
              <a
              href="#"
              class="flex flex-col items-center bg-black border border-gray-200 rounded-lg shadow mx-2 mb-4 hover:bg-gray-700"
              >
              <img
                  class="object-cover w-full rounded-t-lg h-48 md:h-96"
                  src="${piloto.driver.image}"
                  alt="image_pilot"
              />
              <div class="flex flex-col justify-between p-4 leading-normal">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  ${piloto.driver.name}
                  </h5>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Equipo del Piloto: ${piloto.team.name} <br />
                  Ranking: ${piloto.position} <br />
                  Carreras ganadas: ${piloto.wins} <br />
                  </p>
              </div>
              </a>
          `;
          resultsContainer.innerHTML += pilotoCard;
      });
  } catch (error) {
      console.error("Error in buscarPilotos:", error);
  }
}

// Llama a la función para cargar datos al cargar la página
cargarDatos();
