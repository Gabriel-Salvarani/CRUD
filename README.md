Proyecto CRUD - Gestión de Libros (MongoDB, TypeScript y Mongoose)

Este proyecto implementa las cinco operaciones fundamentales de la persistencia de datos (CRUD: Create, Read, Update, Delete) utilizando Node.js, TypeScript y Mongoose como ORM para interactuar con una base de datos MongoDB.

La entidad seleccionada para el proyecto es Libro, modelada para gestionar información bibliográfica esencial.

▶️ Instrucciones de Ejecución

El proyecto utiliza un sistema de comandos dinámico a través de npm run dev que procesa los argumentos de la terminal para realizar las operaciones CRUD.

El comando base es: npm run dev <acción> <argumentos...>

Ejemplo de Flujo Completo

1. Crear un nuevo libro (CREATE):

npm run dev crear "El Principito" "Antoine de Saint-Exupéry" "9786073146030" "1943-04-06" true

(La terminal devolverá el documento creado, incluyendo su nuevo _id.)

2. Listar todos los libros (READ ALL):

npm run dev listar

3. Actualizar la disponibilidad (UPDATE):
(Reemplaza [ID_DEL_LIBRO] con el ID obtenido en el paso 1.)

npm run dev actualizar [ID_DEL_LIBRO] disponible false

4. Buscar el libro actualizado (READ BY ID):

npm run dev buscarId [ID_DEL_LIBRO]

5. Eliminar el libro (DELETE):

npm run dev eliminar [ID_DEL_LIBRO]
