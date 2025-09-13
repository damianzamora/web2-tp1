const baseURL = "https://68c56790a712aaca2b68ad08.mockapi.io/api/parcial1";

// Variable global
let juegos = [];

/* Obtengo los id's */
const cardsAll = document.getElementById("cardsAll")
const tableData = document.getElementById("tableinfo")
const buttonForm = document.getElementById("buttonForm")
//Cargar boton de Alta por defecto.
if (buttonForm != null) {
    buttonForm.innerHTML = ""
    buttonForm.innerHTML = '<button class="inputFormOther" onclick="altaJuego(event)">Dar alta</button>' 
}
// Id's de formulario
const formName = document.getElementById("formName");
const formPrice = document.getElementById("formPrice");
const formPlatform = document.getElementById("formPlatform");
const formDescription = document.getElementById("formDescription");
const formGenero = document.getElementById("formGenero");
const formImg = document.getElementById("formImg");


// Carga de datos en index.html o productos.html
if (cardsAll != null) {
    getAllGames().then(allData => {
        juegos = allData; 
 
        if (cardsAll != null) {
            juegos.forEach(juego => {
                    cardsAll.innerHTML += pintarCarta(juego);
            });
        } 
    });
}

if (tableData != null) {
    getAllGames().then(allData => {
        juegos = allData; 
        if (tableData != null) {
            juegos.forEach(juego => {
                    tableData.innerHTML += pintarTabla(juego);
            });   
        } 

    });
}


// Alta, edicion y eliminacion de juego
function eliminarJuego(id) {
    Swal.fire({
        title: "¿Desea eliminar juego?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteGameById(id)
                .then(respuesta => {
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El juego fue eliminado correctamente.",
                        icon: "success"
                    });
                    getAllGames().then(allData => {
                        juegos = allData;
                        if (tableData != null) {
                            tableData.innerHTML = "";
                            juegos.forEach(juego => {
                                tableData.innerHTML += pintarTabla(juego);
                            });
                        }
                    });
                })
                .catch(error => {
                    Swal.fire({
                        title: "Error",
                        text: "Ocurrió un error al eliminar el juego.",
                        icon: "error"
                    });
                });
        }
    });
} 

function altaJuego(event) {
    event.preventDefault(); // Siempre prevenimos el envío del form por defecto
    const form = document.getElementById('formAdminId');
    if (!form.checkValidity()) {
        Swal.fire({
            title: "Completar campos!",
            icon: "warning"
        });
        return; // No continúa si el form no es válido
    }

    const nuevoJuego = {
        name: formName.value,
        price: Number(formPrice.value),
        genero: formGenero.value,
        img: formImg.value,
        platform: formPlatform.value,
        description: formDescription.value,
    };
    createGame(nuevoJuego)
        .then((juegoCreado) => {
            Swal.fire({
                title: "Juego agregado",
                text: "El juego se dio de alta correctamente.",
                icon: "success"
            });
                    getAllGames().then(allData => {
                        juegos = allData;
                        if (tableData != null) {
                            tableData.innerHTML = "";
                            juegos.forEach(juego => {
                                tableData.innerHTML += pintarTabla(juego);
                            });
                        }
                    });
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al dar de alta el juego.",
                icon: "error"
            });
        });
}


function editarCargarForm(id) {
    buttonForm.innerHTML = ""
    buttonForm.innerHTML = `<button class="inputFormOther" onclick="editarJuego('${id}',event)">Editar</button>`
    buttonForm.innerHTML += `<button class="inputFormOther">Cancelar</button>`
    juegos.forEach((juego) => {
        if (juego.id == id) {
            formName.value = juego.name
            formPrice.value = juego.price
            formPlatform.value = juego.platform
            formGenero.value = juego.genero
            formDescription.value = juego.description
            formImg.value = juego.img
        }
    })
}

function editarJuego(id, event) {
    event.preventDefault(); // Detenemos envío por defecto

    if (camposInvalidos(formName.value, formPlatform.value, formGenero.value)) {
        Swal.fire({
            title: "Completar campos!",
            icon: "warning"
        });
        return;
    }

    const juegoEditado = {
        name: formName.value,
        price: Number(formPrice.value),
        platform: formPlatform.value,
        genero: formGenero.value,
        description: formDescription.value,
        img: formImg.value,
    };

    updateGame(id, juegoEditado)
        .then((juegoActualizado) => {
            Swal.fire({
                title: "Juego actualizado",
                text: "Los datos del juego fueron modificados correctamente.",
                icon: "success"
            });
                getAllGames().then(allData => {
                juegos = allData;
                if (tableData != null) {
                    tableData.innerHTML = "";
                    juegos.forEach(juego => {
                        tableData.innerHTML += pintarTabla(juego);
                    });
                }
            });
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al actualizar el juego.",
                icon: "error"
            });
        });
}

// Filtros de busqueda de administrador.

function filtroPC() {
    if (tableData != null) {
        tableData.innerHTML =""
        juegos.forEach((juego) => {
            if (juego.platform == 'PC') {
            tableData.innerHTML += pintarTabla(juego)                           
            }                        
        }) 
    }
}

function filtroPS5() {
    if (tableData != null) {
        tableData.innerHTML =""
        juegos.forEach((juego) => {
            if (juego.platform == 'PS5') {
            tableData.innerHTML += pintarTabla(juego)                           
            }                        
        }) 
    }
}

function filtroTODOS() {
    if (tableData != null) {
        tableData.innerHTML =""
        juegos.forEach((juego) => {
            tableData.innerHTML += pintarTabla(juego)                                                                               
        }) 
    }
}

function filtroMayorPrecio() {
    const juegoFiltrado = juegos.map((x) => x)        
    if (tableData != null) {
        tableData.innerHTML =""
        juegoFiltrado.sort(function (a, b) {
            if (a.price < b.price) {
              return 1;
            }
            if (a.price > b.price) {
              return -1;
            }
            return 0;
          });
          juegoFiltrado.forEach((juego) => {
                    tableData.innerHTML += pintarTabla(juego)                                                                                                                                                                  
            }) 
    }
}


function filtroMenorPrecio() {
    const juegoFiltrado = juegos.map((x) => x)

    if (tableData != null) {
        tableData.innerHTML =""

        juegoFiltrado.sort(function (a, b) {
            if (a.price > b.price) {
              return 1;
            }
            if (a.price < b.price) {
              return -1;
            }
            return 0;
          });
          juegoFiltrado.forEach((juego) => {          
                    tableData.innerHTML += pintarTabla(juego)                                                                                                                                                        
            }) 
    }
}

// Metodos globales.

function pintarTabla(juego) {
    return `<td class="tdocultar"><img class="cardImgTable" src="${juego.img}" alt="${juego.name}"></td>
            <td>${juego.name}</td>
            <td>USD ${juego.price}</td>
            <td>${juego.platform}</td>
            <td class="tdocultar">${juego.genero}</td>
            <td class="tdocultar">${juego.description}</td>
            <td><button onclick="eliminarJuego('${juego.id}')">Eliminar</button></td>
            <td><button onclick="editarCargarForm('${juego.id}')">Editar</button></td>`
 }
 
 function pintarCarta(juego) {
 return `<div class="card">
            <div class ="divImg">
                <img id="cardImg" src="${juego.img}" alt="${juego.name}">
            </div>            
            <div class ="infocard">
                <div class="cardprice">
                <p class="price">USD ${juego.price}</p>
                </div>                                
                <p class="info">${juego.name}</p>
                <p class="info">${juego.platform}</p>  
                <p class="info">${juego.description}</p>                                                     
            </div>
        </div>`
 }

 function camposInvalidos(formName,formPlatform,formGenero) {
    if (formName == "" || formPlatform == "" || formGenero == "") {
        return true;
    }
    return false;
 }

 // Llamado a Axios

 function getAllGames() {
    return axios.get(`${baseURL}/games`)
        .then(respuesta => {
            const datos = respuesta.data;
            const juegosFormateados = datos.map(juego => ({
                id: String(juego.id),
                name: juego.name,
                price: Number(juego.price),
                platform: juego.platform,
                genero: juego.genero,
                description: juego.description,
                img: juego.img
            }));
            return juegosFormateados;
        })
        .catch(error => {
            console.error("Ocurrió un error al obtener los datos:", error);
            return []; 
        });
}

function deleteGameById(id) {
    return axios.delete(`${baseURL}/games/${id}`)
        .then(respuesta => {
            console.log(`Juego con ID ${id} eliminado correctamente.`);
            return respuesta.data; 
        })
        .catch(error => {
            console.error(`Error al eliminar el juego con ID ${id}:`, error);
            throw error; 
        });
}

function createGame(juego) {
    return axios.post(`${baseURL}/games`, juego)
        .then(res => res.data)
        .catch(error => {
            console.error("Error al dar de alta el juego:", error);
            throw error;
        });
}

function updateGame(id, juegoActualizado) {
    return axios.put(`${baseURL}/games/${id}`, juegoActualizado)
        .then(res => res.data)
        .catch(error => {
            console.error("Error al editar el juego:", error);
            throw error;
        });
}

