# EMBICICLATE API

Embiciclate es una sencilla aplicacion web, diseñada en `mobile-only` que te permite visualizar una lista de bicicletas, crear una bicicleta, borrarla e incluso mirar los detalles en profundidad si seleccionas una bicicleta.

## Requisitos

Antes de ejecutar este proyecto, asegúrate de tener instalados los siguientes componentes:

- Node.js (v14 o superior)
- npm (v6 o superior)
- MongoDB (local o en la nube)

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
npm install
```

## Scripts

Estos son los principales scripts disponibles para la ejecución del proyecto:

```bash
npm run build: Compila el código TypeScript en la carpeta dist.

npm run build:dev: Compila el código en modo "watch" para desarrollo continuo.

npm run start: Inicia el servidor en producción utilizando las variables de entorno desde el archivo .env.

npm run start:dev: Inicia el servidor en modo desarrollo con reinicio automático al detectar cambios en los archivos.

npm run test: Ejecuta los tests con Jest.

npm run test:dev: Ejecuta los tests en modo "watch" para desarrollo continuo.
npm run test:coverage: Genera un reporte de cobertura de los tests.
```

## Husky y Commitlint

Este proyecto utiliza Husky para la gestión de hooks de Git, y Commitlint para asegurar que los mensajes de commit sigan un formato estandarizado.

Para configurar Husky, simplemente ejecuta:

```bash
npm run prepare
```

## Prettier y ESLint

- El proyecto está configurado con Prettier y ESLint para mantener un estilo de código consistente y evitar errores comunes.

```bash
npx eslint
```

## Dependencias

- Express: Framework web para Node.js.
- Mongoose: ODM (Object Document Mapper) para trabajar con MongoDB.
- Morgan: Middleware para el registro de peticiones HTTP.
- Chalk: Para estilizar la salida de la consola.
- DevDependencies
- TypeScript: Superset de JavaScript que añade tipado estático.
- Jest: Framework de testing para JavaScript.
- ESLint: Linter para JavaScript y TypeScript.
- Prettier: Formateador de código.
- Husky: Hooks de Git.
- Commitlint: Linter para los mensajes de commit.
- Supertest: Para pruebas de endpoints HTTP.
- mongodb-memory-server: Base de datos MongoDB en memoria para tests.

## ENDPOINTS

### GetBikes

- Descripción: Obtiene la lista de todas las bicicletas de la base de datos

- PATH: `/bikes`
- METODO: `GET`
- RESPUESTA

```ts
 "bikes": [
        {
            "_id": "66df58dc3cd2e052040c9e97",
            "brand": "BMC",
            "model": "Teammachine SLR01",
            "alternativeText": "Bicicleta de carretera BMC Teammachine SLR01 de carbono",
            "specs": "Cuadro de carbono Premium Carbon, grupo SRAM Red eTap, frenos de disco hidráulicos",
            "imageUrl": "https://i.ibb.co/gvr77Fb/bmc-teammachine-slr01.webp",
            "material": "Carbono",
            "wheelSize": 28,
            "mode": "Carretera"
        },
        {
            "_id": "66df58f33cd2e052040c9e98",
            "brand": "Giant",
            "model": "Defy Advanced 2",
            "alternativeText": "Bicicleta de carretera Giant Defy Advanced 2 de carbono",
            "specs": "Cuadro de carbono Advanced-Grade Composite, transmisión Shimano 105 de 11 velocidades, frenos de disco",
            "imageUrl": "https://i.ibb.co/KLHZDqy/MY25-Defy-Advanced0-Color-AOcean-Twi.webp",
            "material": "Carbono",
            "wheelSize": 28,
            "mode": "Carretera"
        },
```

## GetBikeByID

- Descripcion: Recibe una `id` por petición i devuelve la bicicleta que coindide con la `id` de los parametros de la petición

- PATH: `/bikes/:bikeId`
- METODO: `GET`
- RESPUESTA

```ts
"bikeToShow": {
        "_id": "66df57923cd2e052040c9e96",
        "brand": "Canyon",
        "model": "Ultimate CF SL 8",
        "alternativeText": "Bicicleta de carretera Canyon Ultimate CF SL 8 de carbono",
        "specs": "Cuadro de carbono, transmisión Shimano Ultegra Di2 de 12 velocidades, frenos de disco hidráulicos",
        "imageUrl": "https://i.ibb.co/zQkXC5B/canyon-cf-sl-8.webp",
        "material": "Carbono",
        "wheelSize": 28,
        "mode": "Carretera"
    }
```

## CreateBike

- Descripcion: Se crea una bicicleta en la base de datos con los datos recibidos por el cuerpo de la petición

- PATH: `/bikes`
- METODO: `POST`
- RESPUESTA

Cuerpo del a petición:

```ts
  {
 "brand": "BMC",
 "model": "Modelaso",
 "alternativeText": "Bicicleta de carretera BMC Teammachine SLR01 de carbono",
 "specs": "Cuadro de carbono Premium Carbon, grupo SRAM Red eTap, frenos de disco hidráulicos",
 "imageUrl": "https://i.ibb.co/gvr77Fb/bmc-teammachine-slr01.webp",
 "material": "Carbono",
 "wheelSize": 28,
 "mode": "Carretera"
}
```

Respuesta con la bici creada con una `id`

```ts
{
    "brand": "BMC",
    "model": "Modelaso",
    "wheelSize": 28,
    "specs": "Cuadro de carbono Premium Carbon, grupo SRAM Red eTap, frenos de disco hidráulicos",
    "material": "Carbono",
    "imageUrl": "https://i.ibb.co/gvr77Fb/bmc-teammachine-slr01.webp",
    "alternativeText": "Bicicleta de carretera BMC Teammachine SLR01 de carbono",
    "mode": "Carretera",
    "_id": "66fe58ff529d7f93d68911dd",
    "__v": 0
}
```

## DeleteBike

- Descripción: Recibe una `id` por parametros y devuelve un mensaje de extito si la bici es borrada.

- PATH: `/bikes/:bikeId`
- METODO: `DELETE`
- RESPUESTA

```ts
{
    "message": "Successfully deleted bike"
}
```
