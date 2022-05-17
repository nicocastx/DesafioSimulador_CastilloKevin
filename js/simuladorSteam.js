//Inicializacion de variables
let opcion = 1;
const cambioDolar = 200;
const impuestaso = 1.69;
let saldo = 0.0;
let nroOrden = 0;

//creacion de clases
class Juego {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    };
    toString() {
        return this.nombre + "\tUSD$" + this.precio;
    };
    precioPesos() {
        return this.precio * cambioDolar;
    }
    precioImpuesto() {
        return this.precioPesos() * impuestaso;
    }
}

// Creacion de objetos
let j1 = new Juego(1, "Among Us", 2.00);
let j2 = new Juego(2, "ARK", 4.00);
let j3 = new Juego(3, "Wallpaper Engine", 6.00);
let j4 = new Juego(4, "Borderlands 2", 8.00);
let j5 = new Juego(5, "Dont Starve: Together", 10.00);
let j6 = new Juego(6, "Cities: Skyline", 12.0);
let j7 = new Juego(7, "Civilization: VI", 14.0);
let j8 = new Juego(8, "Human Fall Flat", 16.0);
let j9 = new Juego(9, "Sekiro: Shadow Die Twice", 18.0);
let j10 = new Juego(10, "Bioshock Infinite", 20.0);
let j11 = new Juego(11, "Total War: Warhammer 3", 22.0);
let j12 = new Juego(12, "Mount and Blade: Bannerlord", 24.0);
const listaJuegos = [j1, j2, j3, j4, j5, j6, j7, j8, j9, j10, j11, j12];
const carrito = [];

//Utilizacion de objetos de HTML
let bienvenida = document.getElementById("welcome");
let username = document.getElementById("username");
let containerJuegos = document.getElementById("containerJuegos");
let buscadorJuegos = document.getElementById("buscadorJuegos");
let carritoFormat = document.getElementById("carritoFormat");
let resetCarrito = document.getElementById("resetCarrito");

// Inicio
formatoJuego(listaJuegos);

username.addEventListener('submit', (e) => {
    e.preventDefault();
    let usuario = document.getElementById("usuario").value;
    welcome.innerHTML = '<h2 class="userInput">Bienvenido, ' + usuario + '!</h2>';
    nombreusuario = usuario;
})

buscadorJuegos.addEventListener('input', () => {
    let busqueda = buscadorJuegos.value;
    listaBuscada = listaJuegos.filter(juego => juego.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    containerJuegos.innerHTML = "";
    formatoJuego(listaBuscada);
})

//agregar juegos al carrito
listaJuegos.forEach(juego => {
    document.getElementById(`btnprod${juego.id}`).addEventListener('click', () => {
        agregarCarrito(juego);
    });
});

carrito.forEach(juego => {
    document.getElementById(`btnborrar${juego.id}`).addEventListener('click', () => {
        carrito = carrito.filter(juegoCarrito => juegoCarrito.id !== juego.id);
        document.getElementById(`juego${juego.id}`).remove();
        console.log(carrito);
    })
})

resetCarrito.addEventListener('click', () => {
    carritoFormat.innerHTML = "";
    carrito.length = 0;
})

//Funciones

function formatoJuego(lista) {
    lista.forEach(juego => {
        containerJuegos.innerHTML += `<div class="card" id="juego${juego.id}" style="width: 18rem;">
        <img src="https://random.imagecdn.app/500/150" class="card-img-top" alt="imagen de un juego">
            <div class="card-body">
                <h5 class="card-title">${juego.nombre}</h5>
                <p class="card-text">Precio en total: USD$${juego.precio}</p>
                <button id="btnprod${juego.id}" class="btn btn-primary">Agregar al carrito</button>
            </div>
        </div>`
    });
}

function agregarCarrito(juego) {
    console.log(carrito);
    if (!(carrito.includes(juego))) {
        carritoFormat.innerHTML += `<div id="carrito${juego.id}" class="row mb-4 d-flex justify-content-between align-items-center">
                            <div class="col-md-2 col-lg-2 col-xl-2">
                                <img src="https://random.imagecdn.app/500/150"
                                    class="img-fluid rounded-3" alt="Juego${juego.id}">
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-3">
                                <h6 class="text-muted">${juego.nombre}</h6>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <input id="form${juego.id}" min="0" name="quantity" value="${cantidadEnCarrito(juego)}" type="text"
                                    class="form-control form-control-sm" />
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 class="mb-0">USD$${juego.precio}</h6>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                <button id="btnborrar${juego.id}" class="text-muted"><i class="fas fa-times"></i></button>
                            </div>
                        </div>`;
        console.log(cantidadEnCarrito(juego))
    }
    carrito.push(juego);
}

function cantidadEnCarrito(juego) {
    if (document.getElementById(`form${juego.id}`) != null) {
        if (carrito.filter(juegoCarrito => juegoCarrito.id === juego.id).length == undefined) {
            document.getElementById(`form${juego.id}`).value = 1; 
        } else {
            document.getElementById(`form${juego.id}`).value = carrito.filter(juegoCarrito => juegoCarrito.id === juego.id).length;
        }
    }
}

//Arranque

/* 
Ingresar objetos a una lista traidos desde un form let objeto = {atrib1: valor, atrib2: valor2}
array.push(objeto)
reiniciar los campos de un form: form.reset();
*/