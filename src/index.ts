// src/index.ts
// Punto de entrada dinámico para comandos CRUD desde la terminal

import {
    connectDB,
    disconnectDB,
    crearLibro,
    obtenerTodosLosLibros,
    obtenerLibroPorId,
    actualizarLibro,
    eliminarLibroPorId,
    ILibro, // Importamos ILibro para el tipado
    LibroData
} from './controllers/controller'; 

// Los argumentos de la terminal: [node, index.ts, accion, arg1, arg2, ...]
const argumentos = process.argv;
const accion = argumentos[2]; 
const valor1 = argumentos[3]; 
const valor2 = argumentos[4]; 
const valor3 = argumentos[5]; 
const valor4 = argumentos[6]; 


/**
 * Función principal que maneja los comandos de la terminal.
 */
const main = async (accion: string | undefined, args: string[]) => {
    if (!accion) {
        console.log("❌ Debes especificar una acción.");
        console.log("Comandos válidos: crear, listar, buscarId, actualizar, eliminar");
        return;
    }

    await connectDB();
    
    try {
        // Tipamos resultado como un tipo genérico que puede contener cualquier retorno CRUD
        let resultado: any; 

        switch (accion.toLowerCase()) {
            case 'crear':
                if (args.length < 6) {
                    console.log("❌ Uso: crear <titulo> <autor> <isbn> <fechaPublicacion> <disponible(true/false)>");
                    break;
                }
                const [titulo, autor, isbn, fechaPublicacion, disponibleStr] = args.slice(3, 8);
                
                const data: LibroData = {
                    titulo,
                    autor,
                    isbn,
                    fechaPublicacion: new Date(fechaPublicacion),
                    disponible: disponibleStr.toLowerCase() === 'true',
                };

                resultado = await crearLibro(data);
                console.log("✅ Libro creado exitosamente:");
                console.log(resultado);
                break;

            case 'listar':
                // Se espera un array de ILibro
                const libros: ILibro[] = await obtenerTodosLosLibros();
                console.log(`✅ ${libros.length} libros encontrados:`);
                // CORRECCIÓN APLICADA: Tipado de la variable 'l' como ILibro
                libros.forEach((l: ILibro, i) => console.log(`${i + 1}. [ID: ${l._id}] ${l.titulo} por ${l.autor}`));
                break;

            case 'buscarid':
                if (!valor1) {
                    console.log("❌ Uso: buscarid <ID_del_libro>");
                    break;
                }
                resultado = await obtenerLibroPorId(valor1);
                console.log(resultado ? "✅ Libro encontrado:" : "❌ Libro no encontrado.");
                console.log(resultado || '---');
                break;

            case 'actualizar':
                if (!valor1 || !valor2 || !valor3) {
                    console.log("❌ Uso: actualizar <ID_del_libro> <campo_a_actualizar> <nuevo_valor>");
                    console.log("Ej: actualizar <ID> disponible false");
                    break;
                }
                const [idUpdate, campo, valor] = [valor1, valor2, valor3];
                
                let updateData: Partial<LibroData> = {};
                switch (campo.toLowerCase()) {
                    case 'disponible':
                        updateData.disponible = valor.toLowerCase() === 'true';
                        break;
                    case 'titulo':
                    case 'autor':
                    case 'isbn':
                        updateData[campo.toLowerCase() as 'titulo' | 'autor' | 'isbn'] = valor;
                        break;
                    case 'fechapublicacion':
                        updateData.fechaPublicacion = new Date(valor);
                        break;
                    default:
                        console.log(`❌ Campo '${campo}' no válido para actualizar.`);
                        await disconnectDB();
                        return;
                }

                resultado = await actualizarLibro(idUpdate, updateData);
                console.log(resultado ? "✅ Libro actualizado:" : "❌ Libro no se pudo encontrar/actualizar.");
                console.log(resultado || '---');
                break;

            case 'eliminar':
                if (!valor1) {
                    console.log("❌ Uso: eliminar <ID_del_libro>");
                    break;
                }
                resultado = await eliminarLibroPorId(valor1);
                console.log(resultado ? `✅ Libro eliminado: ${resultado.titulo}` : "❌ Libro no encontrado para eliminar.");
                break;

            default:
                console.log("❌ Comando inválido. Comandos válidos: crear, listar, buscarId, actualizar, eliminar");
                break;
        }

    } catch (error: unknown) { // Bloque catch principal, tipado como unknown
        console.error("\n*** ¡ERROR DURANTE LA OPERACIÓN! ***");
        console.error(error);
    } finally {
        await disconnectDB();
    }
}

// Ejecución
main(accion, argumentos);
