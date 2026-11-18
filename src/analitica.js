function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
    let acumuladorTotal = 0; 
    for (const venta of ventas) {
        if (venta.cantidad > 0) {
        acumuladorTotal += valorVenta(venta);
    }
}
    return acumuladorTotal;
}

function unidadesVendidas(ventas) {
    let totalUnidades = 0;

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
        totalUnidades += venta.cantidad;
    }
}

    return totalUnidades;
}

function ventaMayor(ventas) {
    if (ventas.length === 0) {
        return null; // Caso borde: Si el arreglo está vacío, devolvemos null para que no falle.
    }

    let mayor = ventas[0]; 
    let maxValor = valorVenta(mayor);

    for (const venta of ventas) {
        const valorActual = valorVenta(venta);

        if (valorActual > maxValor) {
        maxValor = valorActual;
        mayor = venta; 
    }
}

return mayor;
}

function ticketPromedio(ventas) {
    let sumaTotal = 0;
    let contadorValidas = 0; // Patrón Contador

    for (const venta of ventas) {
        if (venta.cantidad > 0) {
        sumaTotal += valorVenta(venta);
        contadorValidas++; // Incrementamos el contador en 1 por cada venta válida
    }
}

  // Caso borde crítico: Si no hay ventas válidas, evitar división por cero (que da NaN)
    if (contadorValidas === 0) {
        return 0;
    }

return sumaTotal / contadorValidas;
}

function ventasPorCiudad(ventas, ciudadBuscada) {
    let totalCiudad = 0;
  // Normalizamos el parámetro de entrada: quitamos espacios y pasamos a minúsculas
    const ciudadLimpia = ciudadBuscada.trim().toLowerCase();

    for (const venta of ventas) {
    // Normalizamos también la ciudad que viene en cada objeto de los datos
        const ciudadVenta = venta.ciudad.trim().toLowerCase();

        if (ciudadVenta === ciudadLimpia && venta.cantidad > 0) {
        totalCiudad += valorVenta(venta);
    }
}

return totalCiudad;
}

//total vendido con filter y reduce
function totalVendidoM(ventas) {
    return ventas
    .filter(venta => venta.cantidad > 0) // Filtramos ventas con cantidad > 0
    .reduce((acumulador, venta) => acumulador + valorVenta(venta), 0); // Sumamos los valores de las ventas filtradas
}

//unidades vendidas con filter y reduce
function unidadesVendidasM(ventas) {
    return ventas
    .filter(venta => venta.cantidad > 0) // Filtramos ventas con cantidad > 0
    .reduce((acumulador, venta) => acumulador + venta.cantidad, 0); // Sumamos las cantidades de las ventas filtradas
}

//venta por ciudad con filter y reduce
function ventasPorCiudadM(ventas, ciudadBuscada) {
    const ciudadLimpia = ciudadBuscada.trim().toLowerCase();

    return ventas
        .filter(venta => venta.ciudad.trim().toLowerCase() === ciudadLimpia && venta.cantidad > 0)
        .reduce((acumulador, venta) => acumulador + valorVenta(venta), 0);
}

//total por ciudad con diccionario
function totalPorCiudad(ventas) {
    return ventas
    .filter(venta => venta.cantidad > 0) // Filtramos ventas con cantidad > 0
    .reduce((diccionario, venta) => {
        const ciudadRaw = venta.ciudad.trim().toLowerCase(); // Normalizamos la ciudad para evitar problemas de mayúsculas/minúsculas y espacios duplicados
        const ciudad = ciudadRaw.charAt(0).toUpperCase() + ciudadRaw.slice(1); // Capitalizamos la primera letra de la ciudad

        diccionario[ciudad] = (diccionario[ciudad] || 0) + valorVenta(venta); // Sumamos el valor de la venta a la ciudad correspondiente, si la ciudad no existe en el diccionario, la inicializamos en 0 y luego sumamos el valor de la venta.
        return diccionario;
    }, {});// Inicializamos el diccionario como un objeto vacío
}

//unidades por producto
function unidadesPorProducto(ventas) {
    return ventas
    .filter(venta => venta.cantidad > 0) // Filtramos ventas con cantidad > 0
    .reduce((diccionario, venta) => {
        const producto = venta.producto.trim(); // Normalizamos el nombre del producto para evitar problemas de espacios duplicados

        diccionario[producto] = (diccionario[producto] || 0) + venta.cantidad; // Sumamos la cantidad de la venta al producto correspondiente
        return diccionario;
    }, {});// Inicializamos el diccionario como un objeto vacío
}
//top k productos por valor generado
function topProductosPorValor(ventas, k) {
    const dineroPorProducto = ventas
    .filter(venta => venta.cantidad > 0) // Filtramos ventas con cantidad > 0
    .reduce((diccionario, venta) => {
        const producto = venta.producto.trim(); // Normalizamos el nombre del producto para evitar problemas de espacios duplicados

        diccionario[producto] = (diccionario[producto] || 0) + valorVenta(venta); // Sumamos el valor de la venta al producto correspondiente
        return diccionario;
    }, {});// Inicializamos el diccionario como un objeto vacío


//convertimos el diccionario en un arreglo de objetos
const listaProductos = Object.entries(dineroPorProducto).map(([producto, total]) => ({ producto, total }));

// Ordenamos los productos de mayor a menor usando el operador de propagacion [...]
return [...listaProductos].sort((a, b) => b.total - a.total).slice(0, k); // Devolvemos los primeros k productos
}


//ventas del día
function ventasDelDia(ventas, fechaBuscada) {
    const ventasFiltradas = ventas.filter(v => v.fecha === fechaBuscada && v.cantidad > 0);
    
    const totalDinero = ventasFiltradas.reduce((acc, v) => acc + valorVenta(v), 0);
    const totalUnidades = ventasFiltradas.reduce((acc, v) => acc + v.cantidad, 0);
    
    // Si no hay ventas, el ticket promedio debe retornar 0 en lugar de NaN
    const ticketProm = ventasFiltradas.length > 0 ? totalDinero / ventasFiltradas.length : 0;

    return {
        fecha: fechaBuscada,
        transacciones: ventasFiltradas.length,
        totalDinero,
        totalUnidades,
        ticketPromedio: ticketProm
    };
}

/////////////////////////////////////////////////////////////
// Exportamos las funciones para que puedan ser utilizadas en otros archivos
module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad,
    totalVendidoM,
    unidadesVendidasM,
    ventasPorCiudadM,
    totalPorCiudad,
    unidadesPorProducto,
    topProductosPorValor,
    ventasDelDia
};

