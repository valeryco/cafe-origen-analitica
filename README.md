# Café Origen - Motor de Analítica de Ventas (v0.1)

Proyecto de ingeniería de datos y desarrollo backend desarrollado para auditar, estructurar, transformar y reportar el historial comercial de **Café Origen**.

##  ¿Qué es este proyecto?
Es un motor analítico construido en Node.js que procesa datos de ventas sin depender de librerías externas o bases de datos pesadas. Aplica programación funcional (`filter`, `reduce`, `sort`, `slice`), patrones de acumulación/conteo y estructuras de diccionarios para generar indicadores gerenciales listos para la toma de decisiones.

##  Requisitos Técnicos
* Node.js (versión LTS recomendada)
* VS Code (o cualquier entorno de desarrollo compatible con JavaScript)
* Git y GitHub

##  Estructura del Proyecto
```text
cafe-origen-analitica/
├── src/
│   ├── datos.js         # Arreglo base con los registros de ventas y sus errores crudos
│   ├── analitica.js     # Motor de funciones puras (ciclos, métodos funcionales y agrupaciones)
│   ├── explorar.js      # Script de exploración inicial de la estructura de datos
│   ├── verificar.js     # Script de pruebas automatizadas (Ciclos vs Métodos funcionales)
│   └── reporte.js       # Script generador del reporte gerencial formateado en pesos colombianos
├── bitacora.md          # Bitácora técnica (Diccionario, pseudocódigo, trazas y depuración)
└── README.md            # Documentación general del proyecto