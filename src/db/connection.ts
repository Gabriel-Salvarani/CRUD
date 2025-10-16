import fs from "node:fs"

const DB_PATH = "./src/listaLibros.json"

const readDb = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))
const writeDb = (libros: any) => fs.writeFileSync(DB_PATH, JSON.stringify(libros))

export { readDb, writeDb }