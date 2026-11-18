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

module.exports = {
    valorVenta,
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad
};