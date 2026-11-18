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

## Análisis Funcional

### 1. `totalVendidoM(ventas)`
- **¿Qué recorro?:** El arreglo `ventas` completo.
- **¿Qué filtro?:** Descartamos los registros con `cantidad <= 0` (como el caso borde de la venta 8).
- **¿Qué transformo?:** No aplicamos `.map()`; pasamos directamente los objetos filtrados al acumulador.
- **¿Qué acumulo?:** El valor monetario total (`cantidad * precio`) de las ventas válidas.
- **¿Cómo agrupo?:** No agrupa, reduce toda la colección a un único valor numérico total.

### 2. `unidadesVendidasM(ventas)`
- **Qué recorro?:** El arreglo `ventas` completo.
- **Qué filtro?:** Las ventas con `cantidad > 0`.
- **Qué transformo?:** Ninguna transformación previa de datos.
- **Qué acumulo?:** El número entero de unidades compradas (`venta.cantidad`).
- **¿Cómo agrupo?:** No agrupa, reduce la colección a un total global de unidades.

### 3. `ventasPorCiudadM(ventas, ciudadBuscada)`
- **Qué recorro?:** El arreglo `ventas` completo.
- **Qué filtro?:** Las ventas con `cantidad > 0` y cuya ciudad normalizada (`.trim().toLowerCase()`) coincida exactamente con la ciudad buscada.
- **Qué transformo?:** Normalización de texto en la ciudad para evitar errores de mayúsculas o espacios.
- **Qué acumulo?:** El valor monetario de las transacciones que cumplen la condición de la ciudad.
- **¿Cómo agrupo?:** No agrupa por todas las ciudades, sino que filtra y reduce para obtener el total de una ciudad específica.

### 4. `totalPorCiudad(ventas)`
- **Qué recorro?:** El arreglo `ventas` completo.
- **Qué filtro?:** Las ventas con `cantidad > 0`.
- **Qué transformo?:** Normalización de la cadena de texto de la ciudad (aplicando `.trim().toLowerCase()` y capitalizando la primera letra) para evitar duplicados por errores tipográficos.
- **Qué acumulo?:** Un objeto en forma de **diccionario** (`{}`) donde las llaves son las ciudades y los valores son acumulaciones de dinero.
- **¿Cómo agrupo?:** Usando la ciudad normalizada como clave acumuladora del diccionario: `diccionario[ciudad] = (diccionario[ciudad] || 0) + valorVenta(v)`.

### 5. `unidadesPorProducto(ventas)`
- **Qué recorro?:** El arreglo `ventas` completo.
- **Qué filtro?:** Las ventas con `cantidad > 0`.
- **Qué transformo?:** Normalización del nombre del producto usando `.trim()` para limpiar espacios sobrantes.
- **Qué acumulo?:** Un objeto diccionario (`{}`) que suma las unidades correspondientes a cada producto.
- **¿Cómo agrupo?:** Usando el nombre del producto como clave del diccionario: `diccionario[producto] = (diccionario[producto] || 0) + venta.cantidad`.

### 6. `topProductosPorValor(ventas, k)`
- **Qué recorro?:** Primero el arreglo `ventas` para la reducción inicial y posteriormente las entradas del diccionario resultante (`Object.entries`).
- **Qué filtro?:** Las ventas con `cantidad > 0`.
- **Qué transformo?:** Transformamos el objeto diccionario de agrupaciones en un arreglo plano de objetos usando `.map(([producto, total]) => ({ producto, total }))`.
- **Qué acumulo?:** El dinero total generado por cada producto mediante `.reduce()`.
- **¿Cómo agrupo y ordeno?:** Agrupamos por producto en un diccionario de dinero, luego convertimos a arreglo, ordenamos de forma descendente usando `.sort((a, b) => b.total - a.total)` sobre una copia inmutable (`[...]`), y recortamos con `.slice(0, k)`.

## Registro de Depuración (Debugging v0.1)

### Error 1: Duplicidad de ciudades en agrupaciones (ej. "Bogotá" y "Bogotá ")
* **Síntoma:** Al agrupar las ventas por ciudad, la ciudad de Bogotá aparecía listada dos veces de forma independiente, separando sus totales de venta.
* **Entrada que lo produce:** Registros con variaciones de espacios en blanco o minúsculas en la propiedad `ciudad` (ej. `"Bogotá"` vs `" Bogotá "` o `"medellín"`).
* **Hipótesis:** El objeto diccionario usaba directamente el valor crudo del campo `ciudad` como clave, interpretando cadenas con espacios o mayúsculas distintas como llaves únicas en memoria.
* **Prueba realizada:** Impresión por consola (`console.log`) de las claves crudas del diccionario antes de acumular.
* **Causa:** Falta de normalización previa de las cadenas de texto dentro de la función de agrupación (`reduce`).
* **Corrección:** Aplicar una función de limpieza sistemática en el reducer: `const ciudadRaw = venta.ciudad.trim().toLowerCase();` seguida de la capitalización inicial `ciudadRaw.charAt(0).toUpperCase() + ciudadRaw.slice(1);`.

### Error 2: Aparición de `NaN` (Not a Number) al filtrar un día sin ventas
* **Síntoma:** Al calcular indicadores (como el ticket promedio) para fechas donde no existían transacciones, el resultado devuelto era `NaN` en lugar de un valor monetario o numérico en cero.
* **Entrada que lo produce:** Un arreglo filtrado vacío `[]` enviado a funciones de división (suma total dividida entre cantidad de transacciones).
* **Hipótesis:** Se estaba realizando una división matemática (`total / cantidad`) donde la cantidad de transacciones válidas era `0`, resultando en una indeterminación matemática (`0 / 0 = NaN`).
* **Prueba realizada:** Ejecución de pruebas con arreglos vacíos o fechas inexistentes y monitoreo con `console.log` del divisor.
* **Causa:** Ausencia de una guarda condicional (validación de límites) antes de efectuar la división de promedios.
* **Corrección:** Implementación de un operador ternario de seguridad: `const ticketProm = ventasFiltradas.length > 0 ? totalDinero / ventasFiltradas.length : 0;` que intercepta los divisores en cero y retorna `0` de forma controlada.