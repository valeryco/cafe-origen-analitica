const ventas = require("./datos.js"); // require() sirve para importar código de otro archivo o módulo de JavaScript y poder utilizarlo en el archivo actual.

console.log("Cantidad total de registros:", ventas.length); // Muestra en la consola el contenido del arreglo de ventas.
console.log("Primer registro:", ventas[0]); // Muestra en la consola el primer registro del arreglo de ventas.
console.log("Cuarto registro:", ventas[3]); // Muestra en la consola el cuarto registro del arreglo de ventas.
console.log("Último registro:", ventas[ventas.length - 1]); // Muestra en la consola el último registro del arreglo de ventas.
console.table(ventas); // Muestra en la consola el contenido del arreglo de ventas en formato de tabla.