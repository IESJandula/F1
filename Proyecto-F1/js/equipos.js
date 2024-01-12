// Función asincrónica para cargar datos desde el archivo JSON
async function cargarDatos() {
    try {
        const response = await fetch("../files/teams.json");
        const data = await response.json();
        const teams = data; // Ajusta esto según la estructura real de tu JSON
        console.log(teams);
        mostrarDatos(teams);
        return teams;
    } catch (error) {
        console.error("Error fetching or parsing JSON:", error);
        return null;
    }
}

// Función que se encarga de mostrar los datos en el HTML
// Función que se encarga de mostrar los datos en tarjetas HTML
function mostrarDatos(teams) {
    // Obtener la referencia del elemento con el id "caja"
    var divTeams = document.getElementById("caja");

    // Crear las tarjetas
    for (var i = 0; i < teams.length; i++) {
        // Crear un elemento <a> para la tarjeta
        var tarjeta = document.createElement("a");
        tarjeta.href = "#";
        tarjeta.className = "flex flex-col items-center bg-black border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-700 mx-2";

        // Crear un elemento <img> para la imagen del circuito
        var imagen = document.createElement('img');
        imagen.className = "object-cover w-56 h-56 md:w-56 md:h-56 md:rounded-none md:rounded-l-lg";
        imagen.src = teams[i].logo;
        imagen.alt = "image_circuit";
        tarjeta.appendChild(imagen);

        // Crear un elemento <div> para el contenido de la tarjeta
        var contenido = document.createElement("div");
        contenido.className = "flex flex-col justify-between p-4 leading-normal w-56";

        // Crear un elemento <h5> para el nombre del circuito
        var nombre = document.createElement("h5");
        nombre.className = "mb-2 text-2xl font-bold tracking-tight text-white";
        var textoNombre = document.createTextNode(teams[i].name);
        nombre.appendChild(textoNombre);
        contenido.appendChild(nombre);

        // Crear un elemento <p> para la información del circuito (país y ciudad)
        var info = document.createElement("p");
        info.className = "mb-3 font-normal text-gray-700";
        var textoInfo = document.createTextNode("País: " + teams[i].base + "<br />Neumáticos: " + teams[i].tyres);
        info.innerHTML = textoInfo.textContent;
        contenido.appendChild(info);

        // Agregar el contenido al elemento de la tarjeta
        tarjeta.appendChild(contenido);

        // Agregar la tarjeta al contenedor principal
        divTeams.appendChild(tarjeta);
    }
}

// Llamar a la función para cargar datos al cargar la página
cargarDatos();