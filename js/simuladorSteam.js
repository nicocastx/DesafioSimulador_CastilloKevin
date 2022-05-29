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
    precioPesos() {
        return this.precio * cambioDolar;
    }
    precioImpuesto() {
        return this.precioPesos() * impuestaso;
    }
}

//Solicitud de JSON local
fetch("../src/json/juegos.json")
.then(response => response.json())
.then(juegos => {formatoJuego(juegos);})

// Creacion de objetos
// let j1 = new Juego(1, "Among Us", 2.00);
// let j2 = new Juego(2, "ARK", 4.00);
// let j3 = new Juego(3, "Wallpaper Engine", 6.00);
// let j4 = new Juego(4, "Borderlands 2", 8.00);
// let j5 = new Juego(5, "Dont Starve: Together", 10.00);
// let j6 = new Juego(6, "Cities: Skyline", 12.0);
// let j7 = new Juego(7, "Civilization: VI", 14.0);
// let j8 = new Juego(8, "Human Fall Flat", 16.0);
// let j9 = new Juego(9, "Sekiro: Shadow Die Twice", 18.0);
// let j10 = new Juego(10, "Bioshock Infinite", 20.0);
// let j11 = new Juego(11, "Total War: Warhammer 3", 22.0);
// let j12 = new Juego(12, "Mount and Blade: Bannerlord", 24.0);
// const listaJuegos = [j1, j2, j3, j4, j5, j6, j7, j8, j9, j10, j11, j12];
let carrito = [];
if (localStorage.getItem("carrito") != null) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


//Utilizacion de objetos de HTML
let bienvenida = document.getElementById("welcome");
let username = document.getElementById("username");
let containerJuegos = document.getElementById("containerJuegos");
let buscadorJuegos = document.getElementById("buscadorJuegos");
let carritoFormat = document.getElementById("carritoFormat");
let resetCarrito = document.getElementById("resetCarrito");
let confirmCompra = document.querySelector(`#comprarCarrito`);
let totalContainer = document.getElementById("totalContainer");

// Inicio

formatoJuego(listaJuegos);

if (localStorage.getItem("carrito") != null) {
    leerCarrito();
}

if (localStorage.getItem("usuario") == null) {
    username.innerHTML = `<div class="mb-3">
    <label for="usuario" class="form-label">Ingrese su nombre de usuario</label>
    <input type="text" class="form-control" id="usuario" aria-describedby="usernameHelp">
</div>
<button type="submit" class="btn btn-primary">Saludame</button>`
} else {
    welcome.innerHTML = `<h2 class="userInput">Bienvenido, ${localStorage.getItem("usuario")} !</h2>
                            <button id="logout" class="btn btn-primary">No soy yo</button>
                            <p>AVISO: se le borrara todos los datos del carrito</p>`;
    cerrarSesion();
    Swal.fire('Session iniciada', `Bienvenido ${localStorage.getItem("usuario")}`, 'success');
}

// Total en blanco
totalContainer.innerHTML = `<h3>Total a pagar:</h3>`

//Eventos

username.addEventListener('submit', (e) => {
    e.preventDefault();
    let usuario = document.getElementById("usuario").value;
    localStorage.setItem("usuario", usuario);
    welcome.innerHTML = `<h2 class="userInput">Bienvenido, ${localStorage.getItem("usuario")} !</h2>
                            <button id="logout" class="btn btn-primary">No soy yo</button>
                            <p>AVISO: se le borrara todos los datos del carrito</p>`;
    cerrarSesion();
    Swal.fire('Session iniciada', `Bienvenido ${localStorage.getItem("usuario")}`, 'success');
})

buscadorJuegos.addEventListener('input', () => {
    let busqueda = buscadorJuegos.value;
    listaBuscada = listaJuegos.filter(juego => juego.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    containerJuegos.innerHTML = "";
    formatoJuego(listaBuscada);
})

//agregar juegos al carrito
listaJuegos.forEach(juego => {
    document.getElementById(`btnprod${juego.id}`).addEventListener('click', (e) => {
        e.preventDefault();
        agregarCarrito(juego);
        actualizarTotal()
    });
});

//borrar un juego del carrito
resetCarrito.addEventListener('click', () => {
    limpiarCarrito();
})

//confirmar compra de carrito
confirmCompra.addEventListener('click', () => {
    Swal.fire({
        title: '¿Esta seguro de realizar la compra?',
        text: "No podrá volver atras!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, realizar la compra!'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Compra realizada!',
                'Gracias por su compra',
                'success'
            )
            limpiarCarrito();
        }
    })
});

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
    if (!(carrito.includes(juego))) {
        carrito.push(juego);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        leerCarrito();
        Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: false,
            avatar:`../src/img/check.png`,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to left, #00b09b, #96c93d)",
            },
            onClick: function () {} // Callback after click
        }).showToast();
    } else {
        Toastify({
            text: "El producto ya esta en el carrito",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: false,
            avatar: `../src/img/error.png`,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #ee0979, #ff6a00)",
            },
            onClick: function () {} // Callback after click
        }).showToast();;
    }
}

function actualizarTotal() {
    let total = 0;

    JSON.parse(localStorage.getItem("carrito")).forEach(juego => {
        total += juego.precio;
    });
    let totalPesos = total * 200;
    let totalImpuesto = totalPesos * impuestaso;
    totalContainer.innerHTML = `<h3>Total a pagar:</h3>`
    totalContainer.innerHTML += `<h4>Total en dolares: USD$${total}</h4>`
    totalContainer.innerHTML += `<h4>Total en pesos: ARG$${totalPesos}</h4>`
    totalContainer.innerHTML += `<h4>Total en pesos con impuesto: ARG$${totalImpuesto}</h4>`
};

function leerCarrito() {
    carritoFormat.innerHTML = "";
    JSON.parse(localStorage.getItem("carrito")).forEach(juego => {
        carritoFormat.innerHTML += `<div id="carrito${juego.id}" class="row mb-4 d-flex justify-content-between align-items-center">
                                    <div class="col-md-2 col-lg-2 col-xl-2">
                                        <img src="https://random.imagecdn.app/500/150"
                                            class="img-fluid rounded-3" alt="Juego${juego.id}">
                                    </div>
                                    <div class="col-md-3 col-lg-3 col-xl-3">
                                        <h6 class="text-muted">${juego.nombre}</h6>
                                    </div>
                                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                        <h6 class="mb-0">USD$${juego.precio}</h6>
                                    </div>
                                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                        <button id="btnborrar${juego.id}" class="text-muted"><i class="fas fa-times"></i></button>
                                    </div>
                                </div>`;
    })
    btnsborrar();
}

function btnsborrar() {
    carrito.forEach(juego => {
        document.getElementById(`btnborrar${juego.id}`).addEventListener('click', () => {
            carrito = carrito.filter(juegoCarrito => juegoCarrito.id != juego.id);
            document.getElementById(`carrito${juego.id}`).remove();
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarTotal();
        })
    })
}

function cerrarSesion() {
    let logout = document.querySelector(`#logout`);
    logout.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        limpiarCarrito();
        location.reload();
    })
}

function limpiarCarrito() {
    carrito.length = 0;
    localStorage.removeItem("carrito", JSON.stringify(carrito));
    carritoFormat.innerHTML = "";
    totalContainer.innerHTML = `<h3>Total a pagar:</h3>`
};