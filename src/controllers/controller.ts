// src/controllers/controller.ts
// Contiene el Modelo, la Conexión, y las 5 funciones CRUD.

import mongoose, { Schema, Document, ObjectId } from 'mongoose';

// ----------------------------------------------------
// 1. Tipado
// ----------------------------------------------------

// 1.1. Interfaz del Documento Mongoose (Debe exportarse para index.ts)
export interface ILibro extends Document {
  titulo: string;
  autor: string;
  isbn: string;
  fechaPublicacion: Date;
  disponible: boolean;
  _id: ObjectId;
}

// 1.2. Tipo de datos de entrada para la creación (DTO limpio, debe exportarse)
export type LibroData = {
  titulo: string;
  autor: string;
  isbn: string;
  fechaPublicacion: Date;
  disponible: boolean;
};


// ----------------------------------------------------
// 2. Esquema y Modelo
// ----------------------------------------------------

const LibroSchema: Schema = new Schema({
  titulo: { type: String, required: true, trim: true },
  autor: { type: String, required: true, trim: true },
  isbn: { type: String, required: true, unique: true, trim: true },
  fechaPublicacion: { type: Date, required: true },
  disponible: { type: Boolean, default: true },
});

export const Libro = mongoose.model<ILibro>('Libro', LibroSchema);

// --- Configuración de la Conexión a MongoDB ---
const MONGO_URI = 'mongodb://localhost:27017/crud_ts_db';

/**
 * Conecta a la base de datos MongoDB.
 */
export const connectDB = async () => { // <--- AHORA EXPORTADO
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error("❌ Error al conectarse a la base de datos:", error);
    process.exit(1); 
  }
};

/**
 * Desconecta de la base de datos.
 */
export const disconnectDB = async () => { // <--- AHORA EXPORTADO
    await mongoose.disconnect();
};


// ----------------------------------------------------
// 3. Implementación de las Funciones CRUD (Todas EXPORTADAS)
// ----------------------------------------------------

// 3.1. CREATE
export const crearLibro = async (libroData: LibroData): Promise<ILibro> => { // <--- AHORA EXPORTADO
  try {
    const nuevoLibro = new Libro(libroData);
    const libroGuardado = await nuevoLibro.save();
    return libroGuardado;
  } catch (error) {
    // Si falla por ISBN duplicado, lanzamos un error claro.
    if ((error as any).code === 11000) {
        throw new Error(`Error: El ISBN '${libroData.isbn}' ya existe.`);
    }
    throw error;
  }
};

// 3.2. READ ALL
export const obtenerTodosLosLibros = async (): Promise<ILibro[]> => { // <--- AHORA EXPORTADO
  const libros = await Libro.find({});
  return libros;
};

// 3.3. READ BY ID
export const obtenerLibroPorId = async (id: string): Promise<ILibro | null> => { // <--- AHORA EXPORTADO
  const libro = await Libro.findById(id);
  return libro;
};

// 3.4. UPDATE
export const actualizarLibro = async ( // <--- AHORA EXPORTADO
  id: string,
  data: Partial<LibroData> 
): Promise<ILibro | null> => {
  const libroActualizado = await Libro.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
  return libroActualizado;
};

// 3.5. DELETE
export const eliminarLibroPorId = async (id: string): Promise<ILibro | null> => { // <--- AHORA EXPORTADO
  const libroEliminado = await Libro.findByIdAndDelete(id);
  return libroEliminado;
};
