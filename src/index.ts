import mongoose, { Document, Schema } from 'mongoose';

interface ILibro extends Document {
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

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB conectado exitosamente.');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}