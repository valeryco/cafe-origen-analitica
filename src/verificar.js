const ventas = require('./datos');
const {
    totalVendido,
    unidadesVendidas,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor
} = require('./analitica');

console.log("===Verificación: Ciclos vs Métodos===\n");

// 1. Comparar totalVendido (Ciclo vs Método)
const resCiclo1 = totalVendido(ventas);
const resMetodo1 = totalVendidoM(ventas);
console.log(`totalVendido -> Ciclo: ${resCiclo1} | Método: ${resMetodo1} =>`, resCiclo1 === resMetodo1 ? "OK" : "DIFERENTE");

// 2. Comparar unidadesVendidas (Ciclo vs Método)
const resCiclo2 = unidadesVendidas(ventas);
const resMetodo2 = unidadesVendidasM(ventas);
console.log(`unidadesVendidas -> Ciclo: ${resCiclo2} | Método: ${resMetodo2} =>`, resCiclo2 === resMetodo2 ? "OK" : "DIFERENTE");

// 3. Comparar ventasPorCiudad (Ciclo vs Método probando con "medellín ")
const resCiclo3 = ventasPorCiudad(ventas, "medellín ");
const resMetodo3 = ventasPorCiudadM(ventas, "medellín ");
console.log(`ventasPorCiudad -> Ciclo: ${resCiclo3} | Método: ${resMetodo3} =>`, resCiclo3 === resMetodo3 ? "OK" : "DIFERENTE");

console.log("\n=== Pruebas de agrupaciones y ranking ===\n");

console.log("\n1. Total por Ciudad (Diccionario normalizado):");
console.log(totalPorCiudad(ventas));

console.log("\n2. Unidades por Producto:");
console.log(unidadesPorProducto(ventas));

console.log("\n3. Top 3 Productos que más dinero generaron:");
console.log(topProductosPorValor(ventas, 3));