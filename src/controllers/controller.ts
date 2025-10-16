import mongoose, { Schema } from 'mongoose';
import crypto from "node:crypto";
import { encontrarLibro } from "../utils/buscarLibros";
import { writeDb } from "../db/connection";
import { commands } from "../utils/commands";

interface ILibro {
  titulo: string;
  autor: string;
  isbn: string; 
  fechaPublicacion: Date;
  disponible: boolean;
}

const LibroSchema: Schema = new Schema({
  titulo: { type: String, required: true, trim: true },
  autor: { type: String, required: true, trim: true },
  isbn: { type: String, required: true, unique: true, trim: true },
  fechaPublicacion: { type: Date, required: false },
  disponible: { type: Boolean, default: true },
}, {
  timestamps: true 
});

const LibroModel = mongoose.model<ILibro>('Libro', LibroSchema);

const MONGO_URI = 'mongodb://localhost:27017/crud_ts_db';

const connectDB = async (URI: string) => {
  try{
    await mongoose.connect(MONGO_URI)
    console.log("Conectado a Mongo DB")
  } catch(e){
    console.log("!Error al conectarse a la base de datos")
    process.exit(1)
  }
}const connectDB = async (URI: string) => {
  try{
    await mongoose.connect(URI)
    console.log("Conectado a Mongo DB")
  } catch(e){
    console.log("!Error al conectarse a la base de datos")
    process.exit(1)
  }
}