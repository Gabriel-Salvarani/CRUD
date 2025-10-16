export const commands = [
  { comando: "lista", descripcion: "Muestra la lista de usuarios", parametros: "" },
  { comando: "agregaLibro", descripcion: "Agrega un libro a la lista de libros", parametros: ["titulo", "autor", "isbn", "fechaPublicacion", "disponible"] },
  { comando: "buscarLibro", descripcion: "Busca un libro mediante un argumento proporcionado", parametros: ["titulo"] },
  { comando: "borrarLibro", descripcion: "Borra un libro mediante un argumento proporcionado", parametros: ["autor"] },
  { comando: "actualizarLibro", descripcion: "Actualiza un libro mediante un argumento proporcionado", parametros: ["titulo", "autor", "isbn", "fechaPublicacion", "disponible"] }
]