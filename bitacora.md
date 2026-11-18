# Bitácora de Análisis - Café Origen

## Diccionario de datos
* **id** (`Number`): Identificador único y secuencial para cada registro de venta.
* **fecha** (`String` - `YYYY-MM-DD`): Fecha exacta en la que se efectuó la transacción comercial.
* **cliente** (`String`): Código alfanumérico que identifica al cliente (ej. C01, C02).
* **producto** (`String`): Nombre del artículo vendido (cafés de origen o accesorios como prensas y molinos).
* **ciudad** (`String`): Ciudad de colombia donde se registra la venta.
* **cantidad** (`Number`): Número de unidades compradas por transacción.
* **precio** (`Number`): Precio unitario del producto expresado en pesos colombianos.

## Casos borde detectados
1. **Inconsistencia de formato en texto (ciudades)**:
   - *Problema*: En el registro 5, la ciudad está escrita como `"medellín"` (en minúscula), mientras que en los demás aparece con la inicial en mayúscula (`"Medellín"`). Si agrupamos por ciudad, esto creará dos categorías separadas por un error tipográfico.
   - *Decisión*: Aplicar una función de normalización (como `.toLowerCase()` o `.trim()`) al limpiar los datos para unificar los nombres.

2. **Cantidad inválida (cero unidades)**:
   - *Problema*: El registro 8 muestra una `cantidad` de `0`. Comercial y lógicamente, una venta registrada no puede tener cero unidades vendidas.
   - *Decisión*: Filtrar y descartar automáticamente los registros con cantidad $\le 0$ durante la fase de transformación.

3. **Mezcla de categorías en el inventario (Productos)**:
   - *Problema*: La columna `producto` combina café empacado (`"Origen Huila 500 g"`) con equipos y herramientas de preparación (`"Prensa francesa"`, `"Molino manual"`). 
   - *Decisión*: En futuras consultas, clasificar los productos por tipo para evitar sesgar los reportes de ventas de café frente a los de accesorios.

## Pseudocódigo

### 1. totalVendido(ventas)
* **Qué recorres:** El arreglo `ventas` completo usando un ciclo `for...of`.
* **Qué condición aplicas:** Verificar que la cantidad sea mayor a 0 (`venta.cantidad > 0`) para evitar registros inválidos.
* **Qué acumulas:** La multiplicación de `cantidad * precio` de cada venta válida.
* **Con qué valor inicias:** Una variable acumuladora en cero (`let acumuladorTotal = 0`).

### 2. unidadesVendidas(ventas)
* **Qué recorres:** El arreglo `ventas` con un ciclo `for...of`.
* **Qué condición aplicas:** Filtrar que la cantidad sea mayor a 0 (`venta.cantidad > 0`).
* **Qué acumulas:** El valor numérico de la propiedad `cantidad` de cada producto vendido.
* **Con qué valor inicias:** Una variable acumuladora en cero (`let totalUnidades = 0`).

### 3. ventaMayor(ventas)
* **Qué recorres:** El arreglo `ventas` con un ciclo `for...of`.
* **Qué condición aplicas:** Evaluar si el valor monetario de la venta actual (`cantidad * precio`) es mayor que el récord registrado hasta el momento.
* **Qué guardas/acumulas:** El objeto completo de la venta que genere más ingresos.
* **Con qué valor inicias:** Iniciamos asumiendo temporalmente que el primer elemento (`ventas[0]`) es el mayor, controlando previamente si el arreglo está vacío (retornando `null`).

### 4. ticketPromedio(ventas)
* **Qué recorres:** El arreglo `ventas` con un ciclo `for...of`.
* **Qué condición aplicas:** Identificar las ventas válidas (`cantidad > 0`).
* **Qué acumulas / cuentas:** Por un lado, acumulas el dinero total de las ventas válidas y, por el otro, utilizas un **contador** que aumente de 1 en 1 por cada transacción válida encontrada.
* **Con qué valor inicias:** Iniciamos la suma en `0` y el contador de transacciones en `0`. (Al final se divide la suma entre el contador, validando que el divisor no sea cero para evitar `NaN`).

### 5. ventasPorCiudad(ventas, ciudadBuscada)
* **Qué recorres:** El arreglo `ventas` con un ciclo `for...of`.
* **Qué condición aplicas:** Normalizar el texto de la ciudad buscada y la del registro usando `.trim().toLowerCase()` para que coincidan sin importar mayúsculas o espacios sobrantes, asegurando además que `cantidad > 0`.
* **Qué acumulas:** La suma del valor monetario (`cantidad * precio`) de las ventas que coincidan con la ciudad.
* **Con qué valor inicias:** Una variable acumuladora en cero (`let totalCiudad = 0`).

## Verificación y Casos de Prueba

Las funciones fueron probadas y validadas con tres escenarios diferentes:
1. **Arreglo Completo**: Las 12 transacciones originales (`totalVendido` arroja $985.000$).
2. **Arreglo de un Solo Elemento**: Evaluando correctamente el comportamiento unitario.
3. **Arreglo Vacío (`[]`)**: Comprobando que no falle ni devuelva `NaN`, retornando `0` o `null` según corresponda.

### Tablas de Traza Manual

#### Traza 1: `totalVendido` (Verificación parcial con 2 elementos)
| Iteración | Elemento actual | Condición (`cantidad > 0`) | Operación acumulador | Valor resultante |
| :--- | :--- | :--- | :--- | :--- |
| Inicial | - | - | `0` | `0` |
| 1 | Venta (`cant: 2, precio: 42000`) | `2 > 0` (Verdadero) | `0 + (2 * 42000)` | `84000` |
| 2 | Venta (`cant: 0, precio: 26000`) | `0 > 0` (Falso) | Se omite | `84000` |

#### Traza 2: `ticketPromedio` (Verificación con 2 ventas válidas)
| Iteración | Venta válida | `sumaTotal` previa | `sumaTotal` nueva | `contadorValidas` |
| :--- | :--- | :--- | :--- | :--- |
| Inicial | - | `0` | `0` | `0` |
| 1 | `1 * 50000 = 50000` | `0` | `50000` | `1` |
| 2 | `2 * 25000 = 50000` | `50000` | `100000` | `2` |
* **Cálculo final:** `100000 / 2 = 50000`.