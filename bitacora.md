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