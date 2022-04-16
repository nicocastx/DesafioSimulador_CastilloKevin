alert("Buenas!, bienvenido a simulador de tienda Steam")
alert("Usted podra hacer compra de unos 10 juegos de steam, pasar los precios de dolares a pesos y sumarles impuestos, ademas, podra sumar credito a su billetera virtual")
alert("Debido a limitaciones del sistema, solo podra comprar un juego por vez, si desea comprar mas de uno, debe realizar la compra de nuevo")
let opcion = 1;
const cambioDolar = 200;
const impuestaso = 1.69;
let saldo = 0.0;

while (opcion > 1 || opcion < 3) {
    alert("Bievenido! Su saldo actual es de ARS$" + saldo);
    opcion = prompt("Ingrese su opcion:\n1.Para manejar el saldo\n2.Para ver/comprar los juegos\n3.Para salir del simulador");
    if (saldo == NaN){
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
    }else if(opcion == 2) {
        let opcionJ = 1;
        let juego = 0;
        while (opcionJ > 1 || opcionJ < 10) {
            opcionJ = parseInt(prompt("Usted eligio pasar a comprar los juegos, Ingrese el tipo de operacion que desea realizar\n" +
            "1. Elegir un juego de la lista de Juegos\n2. Comprar juego\n3. Salir del menu Juegos"));
            if (opcionJ == 1) {
                juego = parseInt(prompt("Ingrese el nombre del juego que desea comprar\n" +
                    "Juego 1: Among Us  US$2.00\n" +
                    "Juego 2: ARK  US$4.00\n" +
                    "Juego 3: Wallpaper Engine  US$6.00\n" +
                    "Juego 4: Borderlands 2  US$8.00\n" +
                    "Juego 5: Dont Starve: Together  US$10.00\n" +
                    "Juego 6: Cities:Skylines  US$12.00\n" +
                    "Juego 7: Civilization VI   US$14.00\n" +
                    "Juego 8: Human:Fall Flat  US$16.00\n" +
                    "Juego 9: Sekiro: Shadows die Twice  US$18.00\n" +
                    "Juego 10: BioShock Infinite    US$20.00\n" + 
                    "11. Salir sin comprar"));
                while(juego < 1 || juego > 11){
                    juego = parseInt(prompt("ERROR! Ingrese el nombre del juego que desea comprar\n" +
                    "Juego 1: Among Us  US$2.00\n" +
                    "Juego 2: ARK  US$4.00\n" +
                    "Juego 3: Wallpaper Engine  US$6.00\n" +
                    "Juego 4: Borderlands 2  US$8.00\n" +


                    "Juego 5: Dont Starve: Together  US$10.00\n" +
                    "Juego 6: Cities:Skylines  US$12.00\n" +
                    "Juego 7: Civilization VI   US$14.00\n" +
                    "Juego 8: Human:Fall Flat  US$16.00\n" +
                    "Juego 9: Sekiro: Shadows die Twice  US$18.00\n" +
                    "Juego 10: BioShock Infinite    US$20.00\n" + 
                    "11. Salir sin comprar"));
                }
                if(juego == 11){
                    juego = 0;
                    alert("Volviendo al menu anterior...");
                    break;
                }
            }else if(opcionJ == 2){
                if (juego != 0){
                    let precio = juego * 2 * cambioDolar * impuestaso;
                    siCompra = confirm("Desea comprar el juego " + juego + "?\n" + "El precio total es de ARS$" + precio);
                    if (siCompra) {
                        saldo = comprarJuego(saldo, precio);
                    } else {
                        alert("Volviendo al menu anterior...");
                        break;
                    }
                } else{
                    alert("Usted no eligio ningun juego aun, volviendo...");
                }
            }else if(opcionJ == 3){
                alert("Volviendo al menu anterior...");
                break;
            }else{
                alert("Opcion no valida")
            }
        }
    } else if(opcion == 3){
        alert("Gracias por utilizar el simulador de tienda Steam, hasta la proxima!");
        break;
    } else {
        alert("Opcion no valida")
    }
}

function masSaldo(saldo) {
    let credito = parseInt(prompt("Ingrese el credito que desea agregar a su billetera"))
    return saldo = saldo + credito
}

function comprarJuego(saldo, precio){
    let total = 0;
    total = saldo - precio;
    if (total >= 0){
        alert("Exito! Su saldo actual es de ARS$" + total);
        return total;
    } else{
        alert("ERROR! Su saldo actual es de ARS$" + saldo);
        return saldo;
    }
}
