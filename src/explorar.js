const ventas = require("./datos.js"); // require() sirve para importar código de otro archivo o módulo de JavaScript y poder utilizarlo en el archivo actual.

console.log("Cantidad total de registros:", ventas.length); // Muestra en la consola el contenido del arreglo de ventas.
console.log("Primer registro:", ventas[0]); // Muestra en la consola el primer registro del arreglo de ventas.
console.log("Cuarto registro:", ventas[3]); // Muestra en la consola el cuarto registro del arreglo de ventas.
console.log("Último registro:", ventas[ventas.length - 1]); // Muestra en la consola el último registro del arreglo de ventas.
console.table(ventas); // Muestra en la consola el contenido del arreglo de ventas en formato de tabla.

const { totalVendido, unidadesVendidas, ventaMayor, ticketPromedio, ventasPorCiudad } = require("./analitica.js"); // Importamos las funciones desde analitica.js
//Escenario de prueba

//1. arreglo completo
const arregloCompleto = ventas;

//2.arreglo de un solo elemento
const arregloUnElemento = [ventas[0]];

//3. arreglo vacío
const arregloVacio = [];

console.log("========================================");

console.log("Escenario 1: Arreglo completo");
console.log("Total vendido:", totalVendido(arregloCompleto));
console.log("Unidades totales vendidas:", unidadesVendidas(arregloCompleto));
console.log("La venta mayor fue:", ventaMayor(arregloCompleto));
console.log("Ticket promedio por compra:", ticketPromedio(arregloCompleto));
console.log("Ventas en Medellín (normalizado):", ventasPorCiudad(arregloCompleto, "medellín "));
console.log("========================================");
console.log("Escenario 2: Arreglo con un solo elemento");
console.log("Total vendido:", totalVendido(arregloUnElemento));
console.log("Unidades totales vendidas:", unidadesVendidas(arregloUnElemento));
console.log("La venta mayor fue:", ventaMayor(arregloUnElemento));
console.log("Ticket promedio por compra:", ticketPromedio(arregloUnElemento));
console.log("Ventas en Medellín (normalizado):", ventasPorCiudad(arregloUnElemento, "medellín "));
console.log("========================================");
console.log("Escenario 3: Arreglo vacío");
console.log("Total vendido:", totalVendido(arregloVacio));
console.log("Unidades totales vendidas:", unidadesVendidas(arregloVacio));
console.log("La venta mayor fue:", ventaMayor(arregloVacio));
console.log("Ticket promedio por compra:", ticketPromedio(arregloVacio));
console.log("Ventas en Medellín (normalizado):", ventasPorCiudad(arregloVacio, "medellín "));