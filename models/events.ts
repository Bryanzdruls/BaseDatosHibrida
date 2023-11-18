import { Schema,model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface IEvento {
  titulo: string;
  descripcion: string;
  categoria: string;
  fecha: Date;
  lugar: string;
  facultadOrganizadora: facultad,
  asistentes?: IAsistentes;
}
interface facultad{
    codigo: {
      type: string,
    },
    nombre: {
        type: string,
    },
    ubicacion:{
        type: string,
    },
    nro_telefono:{
        type: string,
    }
}
export interface IAsistentes {
    idAsistente: string;
    usuario: string;
    nombreCompleto: string;
    relacionInstitucion: string;
    email: string;
    ciudad: ICiudad; 
}

export interface ICiudad {
    nombre: string;
    departamento: string;
    pais: string;
}
 const ciudadSchema = new Schema<ICiudad>({
  nombre: { type: String, required: true },
  departamento: { type: String, required: true },
  pais: { type: String, required: true },
});

const asistenteSchema = new Schema<IAsistentes>({
  idAsistente: { type: String, required: true },
  usuario: { type: String, required: true },
  nombreCompleto: { type: String, required: true },
  relacionInstitucion: { type: String, required: true },
  email: { type: String, required: true },
  ciudad: { type: ciudadSchema, required: true },
});
const eventoSchema = new Schema<IEvento>({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  fecha: { type: Date, required: true },
  lugar: { type: String, required: true },
  facultadOrganizadora: { type: Object, required: true },
  asistentes: { type: [asistenteSchema], required: false },
});

const Evento = model<IEvento>('Evento', eventoSchema);

export default Evento;