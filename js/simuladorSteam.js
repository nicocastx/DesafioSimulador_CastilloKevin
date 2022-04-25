alert("Buenas!, bienvenido a simulador de tienda Steam")
alert("Usted podra hacer compra de unos 10 juegos distintos de steam, pasar los precios de dolares a pesos y sumarles impuestos, ademas, podra sumar credito a su billetera virtual\n",
    "Ademas ahora, podra hacer uso de un carrito para sus compras")
let opcion = 1;
const cambioDolar = 200;
const impuestaso = 1.69;
let saldo = 0.0;
class Juego {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    };
    toString() {
        return this.nombre + "   USD$" + this.precio;
    };
    precioPesos() {
        return this.precio * cambioDolar;
    }
    precioImpuesto() {
        return this.precioPesos() * impuestaso;
    }
}

function masSaldo(saldo) {
    let credito = parseInt(prompt("Ingrese el credito que desea agregar a su billetera"))
    return saldo = saldo + credito
}

function comprarJuegos(saldo, total, carrito) {
    total = saldo - total;
    if (total >= 0) {
        alert("Exito! Su saldo actual es de ARS$" + total);
        carrito.splice(0, carrito.length)
        alert("Su carrito se ha vaciado completamente!");
        return total;
    } else {
        alert("ERROR! Su saldo actual es de ARS$" + saldo);
        return saldo;
    }
}

function verCarrito(carrito) {
    let carritoString = "";
    for (const Juegos of carrito) {
        carritoString += Juegos.toString() + "\n";
    }
    return carritoString;
}

let j1 = new Juego("Among Us", 2.00);
let j2 = new Juego("ARK", 4.00);
let j3 = new Juego("Wallpaper Engine", 6.00);
let j4 = new Juego("Borderlands 2", 8.00);
let j5 = new Juego("Dont Starve: Together", 10.00);
let j6 = new Juego("Cities: Skyline", 12.0);
let j7 = new Juego("Civilization: VI", 14.0);
let j8 = new Juego("Human Fall Flat", 16.0);
let j9 = new Juego("Sekiro: Shadow Die Twice", 18.0);
let j10 = new Juego("Bioshock Infinite", 20.0);
const lista = [j1, j2, j3, j4, j5, j6, j7, j8, j9, j10];
const carrito = [];

while (opcion > 1 || opcion < 3) {
    alert("Bievenido! Su saldo actual es de ARS$" + saldo);
    opcion = prompt("Ingrese su opcion:\n1.Para manejar el saldo\n2.Para ver/comprar los juegos\n3.Para salir del simulador");
    if (saldo == NaN) {
        saldo = 0;
        alert("Ocurrio un error con su saldo, por lo que fue reiniciado a 0");
    }
    if (opcion == 1) {
        let opcionS = 1;
        while (opcionS > 0 || opcionS < 4) {
            opcionS = parseInt(prompt("Usted eligio manejar su saldo, Ingrese el tipo de operacion que desea realizar\n" +
                "1. Agregar credito\n2. Ver saldo actual\n3. Ver mi saldo en dolares\n4. Salir del menu Saldo"));
            if (opcionS == 1) {
                saldo = masSaldo(saldo);
                alert("Exito! Su saldo actual es de ARS$" + saldo);
            } else if (opcionS == 2) {
                alert("Su saldo actual es de ARS$" + saldo);
            } else if (opcionS == 3) {
                alert("Su saldo en dolares es de US$" + (saldo / cambioDolar));
            } else if (opcionS == 4) {
                alert("Volviendo al menu anterior...");
                break;
            } else {
                alert("Ingrese una opcion valida!");
            }
        }
    } else if (opcion == 2) {
        let opcionJ = 1;
        let juego = 0;
        let eleccion = 0;
        while (opcionJ > 1 || opcionJ < 10) {
            opcionJ = parseInt(prompt("Usted eligio pasar a comprar los juegos, Ingrese el tipo de operacion que desea realizar\n" +
                "1. Elegir un juego de la lista de Juegos\n2. Agregar juego elegido al carrito\n3. Quitar ultimo juego del carrito\n4.Realizar mi compra\n5. Ver mi carrito\n6. Salir del menu de Juegos"));
            if (opcionJ == 1) {
                let listajuegos = "";
                for (const Juego of lista) {
                    listajuegos += "Juego " + (lista.indexOf(Juego) + 1) + ": " + Juego.toString() + "\n";
                }
                juego = parseInt(prompt("Ingrese el nombre del juego que desea comprar\n" +
                    listajuegos +
                    "11. Salir sin comprar"));
                while (juego < 1 || juego > 11 || isNaN(juego)) {
                    juego = parseInt(prompt("ERROR! Ingrese el nombre del juego que desea comprar\n" +
                        listajuegos +
                        "11. Salir sin comprar"));
                }
                if (juego == 11) {
                    alert("Volviendo al menu anterior...");
                    break;
                } else {
                    if(lista[juego - 1] != undefined){
                    alert("Usted eligio: " + lista[juego - 1].nombre);
                    eleccion = juego;
                    }
                };
            } else if (opcionJ == 2) {
                if (eleccion != 0) {
                    carrito.push(lista[juego - 1]);
                    alert("Juego agregado al carrito!");
                    eleccion = 0;
                } else {
                    alert("ERROR! Aun no eligio un juego para el carrito!");
                }
            } else if (opcionJ == 3) {
                if (carrito.length > 0) {
                alert("Juego '" + carrito[carrito.length - 1].nombre +"' eliminado del carrito!");
                carrito.pop();
                } else {
                    alert("ERROR! No hay juegos en el carrito!");
                }
            } else if (opcionJ == 4) {
                let totalC = 0;
                for (const Juego of carrito) {
                    totalC += Juego.precioImpuesto();
                }
                let seguro = confirm("Esta seguro que desea realizar su compra? Comprara: \n" +
                    verCarrito(carrito) + 
                    "El total sera de: ARS$" + totalC + "\nEl precio incluye impuestos");
                if (seguro) {
                    if (carrito.length > 0) {
                    saldo = comprarJuegos(saldo, totalC, carrito);
                    } else {
                        alert("ERROR! No hay juegos en el carrito!");
                    }
                } else{
                    alert("Compra cancelada!");
                }
            }else if(opcionJ == 5){
                alert("Su carrito actual es: \n" + verCarrito(carrito));
            } else if (opcionJ == 6) {
                alert("Volviendo al menu anterior...");
                break;
            } else {
                alert("Opcion no valida")
            }
        }
    } else if (opcion == 3) {
        alert("Gracias por utilizar el simulador de tienda Steam, hasta la proxima!");
        break;
    } else {
        alert("Opcion no valida")
    }
}