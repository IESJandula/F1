// Función asincrónica para cargar datos desde el archivo JSON
async function cargarDatos() {
    try {
        const response = await fetch("../files/circuits.json");
        const data = await response.json();
        const circuitos = data; // Ajusta esto según la estructura real de tu JSON
        console.log(circuitos);
        mostrarDatos(circuitos);
        return circuitos;
    } catch (error) {
        console.error("Error fetching or parsing JSON:", error);
        return null;
    }
}

// Función que se encarga de mostrar los datos en el HTML
function mostrarDatos(circuitos) {
    // Obtener la referencia del elemento body
    var divCircuitos = document.getElementById("caja");
    // Crear un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    // Crear las celdas
    for (var i = 0; i < circuitos.length; i++) {
        // Crear las hileras de la tabla
        var hilera = document.createElement("tr");
        // Crear un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final

        //ID DEL CIRCUITO
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(circuitos[i].circuit.id);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);

        //NOMBRE DEL CIRCUITO
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(circuitos[i].circuit.name);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);

        //IMAGEN DEL CIRCUITO
        var celda = document.createElement("td");
        var imagen = document.createElement('img');
        imagen.src = circuitos[i].circuit.image;
        celda.appendChild(imagen);
        hilera.appendChild(celda);

        // Agregar la hilera al final de la tabla (al final del elemento tblBody)
        tblBody.appendChild(hilera);
    }
    // Posicionar el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // Añadir <table> al elemento con el id "circuitos"
    divCircuitos.appendChild(tabla);
    // Modificar el atributo "border" de la tabla y fijarlo a "2";
    tabla.setAttribute("border", "2");
}

// Llamar a la función para cargar datos al cargar la página
cargarDatos();