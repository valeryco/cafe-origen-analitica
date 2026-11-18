const ventas = require('./datos');
const {
    totalVendido,
    unidadesVendidas,
    ticketPromedio,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
} = require('./analitica');

// Imprime el encabezado principal del reporte gerencial indicando la version actual del motor
console.log("cafe origen - reporte gerencial v0.1");
console.log("--------------------------------------------------");

// Seccion 1: Resumen General con los indicadores globales del negocio
console.log("resumen general");
// Calcula el total de dinero recaudado y lo formatea como moneda colombiana (COP)
console.log(`total vendido: $${totalVendido(ventas).toLocaleString("es-CO")}`);
// Calcula el volumen total de unidades físicas vendidas
console.log(`unidades totales: ${unidadesVendidas(ventas).toLocaleString("es-CO")}`);
// Calcula el ticket promedio general por transaccion
console.log(`ticket promedio: $${ticketPromedio(ventas).toLocaleString("es-CO")}`);

// Seccion 2: Ventas agrupadas por ciudad de destino
console.log("\nventas por ciudad");
// Obtiene el diccionario con las ventas agrupadas y normalizadas por ciudad
const porCiudad = totalPorCiudad(ventas);
// Convierte el objeto diccionario en un arreglo iterable para mostrar cada ciudad y su total
for (const [ciudad, total] of Object.entries(porCiudad)) {
    console.log(`${ciudad}: $${total.toLocaleString("es-CO")}`);
}

// Seccion 3: Unidades físicas salientes por cada producto del inventario
console.log("\nunidades por producto");
// Obtiene el diccionario con la sumatoria de unidades por cada producto
const porUnidades = unidadesPorProducto(ventas);
// Recorre el diccionario y muestra el total de unidades por producto
for (const [prod, unidades] of Object.entries(porUnidades)) {
    console.log(`${prod}: ${unidades} unidades`);
}

// Seccion 4: Top 3 de productos que generaron mayores ingresos economicos
console.log("\ntop 3 productos por valor generado");
// Obtiene los 3 productos principales ordenados de mayor a menor valor generado
const top3 = topProductosPorValor(ventas, 3);
// Itera sobre el ranking para imprimirlos con su posicion en la lista
top3.forEach((item, index) => {
    console.log(`${index + 1}. ${item.producto} -> $${item.total.toLocaleString("es-CO")}`);
});

// Seccion 5: Analisis y comparativa de dias especificos (con ventas vs sin ventas)
console.log("\nreporte diario especifico");
// Consulta un dia con actividad comercial conocida
const diaConVentas = ventasDelDia(ventas, "2026-09-01");
console.log(`dia con ventas (${diaConVentas.fecha}): transacciones ${diaConVentas.transacciones}, total $${diaConVentas.totalDinero.toLocaleString("es-CO")}`);

// Consulta un dia sin actividad comercial para verificar la robustez ante datos vacios (evitando NaN)
const diaSinVentas = ventasDelDia(ventas, "2026-09-10");
console.log(`dia sin ventas (${diaSinVentas.fecha}): transacciones ${diaSinVentas.transacciones}, total $${diaSinVentas.totalDinero.toLocaleString("es-CO")}`);