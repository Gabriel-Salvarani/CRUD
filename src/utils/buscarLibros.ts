const encontrarLibro = (Libro: any[], titulo: string) => usuarios.find((usuario) =>
  Libro.titulo.toLowerCase() === titulo.toLowerCase())

export { encontrarLibro }