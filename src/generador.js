const productos = [
    { producto:"Origen Huila 500g", precio:42000},
    { producto:"Origen Nariño 250g", precio:26000},
    { producto:"Origen Sierra 500g", precio:45000},
    { producto:"Prensa francesa", precio:95000},
    { producto:"Molino manual", precio:120000},
];

const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];

const cantidades = [1, 2, 3, 4, 5];

function generarVentas(n) {
    const ventas = [];
    const totalClientes = Math.max(1, Math.floor(n / 3)); // calculamos el total de clientes distintos en funcion de n (entre 1 y n/3)
    const fechaBase = new Date("2026-09-01"); // crea un objeto de fecha inicial para usarlo como punto de referencia temporal

    for (let i = 1; i <= n; i++) { // inicia un ciclo for que se repetirá exactamente n veces y aumenta i en cada vuelta
        const id = i; // asigna el valor del contador i a la variable id para llevar una secuencia numerica unica por venta

        //fecha aleatoria dentro de un rango de 30 días
        const diasAleatorios = Math.floor(Math.random() * 30); // genera un número entero al azar entre 0 y 29 para simular un desplazamiento de días
        const fechaObj = new Date(fechaBase);
        fechaObj.setDate(fechaObj.getDate()+diasAleatorios);//Obtiene el día del mes actual de la fecha (un número del 1 al 31).Le suma la cantidad de días aleatorios que calculaste antes (por ejemplo, 0 a 29).Actualiza el día dentro del mismo objeto fechaObj
        const fecha = fechaObj.toISOString().split("T")[0];//Convierte la fecha a una cadena estándar internacional; Corta esa cadena usando la letra "T" (que separa la fecha de la hora) como separador, dejando un arreglo de dos partes, [0]: Toma solo el primer elemento de ese arreglo, quedándose únicamente con la fecha

        //cliente aleatorio entre 1 y total de clientes (n/3)
        const numeroCliente = Math.floor(Math.random() * totalClientes) + 1;// calcula un entero aleatorio entre 1 y totalClientes usando Math.random() y redondeando hacia abajo con Math.floor()
        const cliente = `C${String(numeroCliente).padStart(3, '0')}`;// convierte el numero a texto, lo rellena con ceros a la izquierda hasta 3 digitos y le antepone la letra C

        //producto y precio aleatorio
        const productoIndex = Math.floor(Math.random() * productos.length);// genera un indice entero aleatorio valido dentro de la longitud del arreglo productos
        const itemSeleccionado = productos[productoIndex]; //obtiene el objeto de producto correspondiente al indice aleatorio seleccionado
        const producto = itemSeleccionado.producto;// extrae el nombre del producto desde el objeto seleccionado
        const precio = itemSeleccionado.precio;// extrae el precio unitario asociado a ese mismo producto

        //ciudad aleatoria
        const ciudadIndex = Math.floor(Math.random() * ciudades.length)// calcula un indice entero aleatorio entre 0 y la longitud del arreglo ciudades menos uno
        const ciudad = ciudades[ciudadIndex];// obtiene y guarda el nombre de la ciudad ubicada en el indice seleccionado

        //cantidad aleatoria
        const cantidadIndex = Math.floor(Math.random() * cantidades.length)// calcula un indice entero aleatorio entre 0 y la longitud del arreglo cantidades menos uno
        const cantidad = cantidades[cantidadIndex];// obtiene y guarda el nombre de cantidad ubicada en el indice seleccionado

        // agrega al arreglo ventas un nuevo objeto con los datos generados para esta iteracion
        ventas.push({
            id,
            fecha,
            cliente,
            producto,
            ciudad,
            cantidad,
            precio
        });
    }
    // devuelve el arreglo completo con todas las ventas simuladas    
    return ventas;
}
    
    // exporta generarVentasN para poder importarla desde otros archivos con require
    module.exports = {
        generarVentas
    }
