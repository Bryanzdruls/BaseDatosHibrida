import { Request, Response } from "express";
import Evento, { IAsistentes, ICiudad, IEvento } from "../models/events";
import { Areas, Ciudad, Departamento, Facultades, Pais, TipoEmpleado, TiposContratacion } from "../models";
import Empleados from "../models/sql/empleados";
import Sedes from "../models/sql/Sedes";


export const getEvento = async (req: Request, res: Response) => {
  const {id} =req.params;
  try {
    const evento = await Evento.findById(id);
    res.json({
      id,
      evento,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};
export const getEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await Evento.find();
    res.json({
      eventos,
      body: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

export const createEvento = async (req: Request, res: Response) => {
  const { titulo, descripcion, categoria, fecha, lugar } = req.body;
  const { ciudad, asistente, sede,  facultadorganizadora } = req.headers;
  
  const ciudadSQl = await Ciudad.findOne({
    where: {
      codigo: ciudad,
    },
    attributes: {exclude:['cod_departamento']},
    include: [
      {
        model: Departamento,
        required:true,
        right:true,
        attributes: {exclude:['cod_pais']},
        as:'departamento',
        include:[{
            model: Pais,
            required:true,
            right:true,
            as: 'pais',
        }]
      },
    ],
  });
  const asistenteSql = await Empleados.findOne({
    where: { identificacion: asistente },
    include:[{
        model: Facultades,
        required:true,
        right:true,
    },{
        model: Sedes,
        required:true,
        right:true,
    },{
        model: Ciudad,
        required:true,
        right:true,
    }]
  });

  const sedeSql = await Sedes.findOne({where: {codigo: sede}})
  const facultadSql = await Facultades.findOne({where: {codigo: facultadorganizadora}})

  const objetoCiudadSql = ciudadSQl?.dataValues;
  const objetoAsistenteSql = asistenteSql?.dataValues;
  
  const {nombre:nombreSede} = sedeSql?.dataValues;
  const objetoFacultadSql = facultadSql?.dataValues;
  
  const  departamentoSql= objetoCiudadSql?.departamento;
  const {pais} = departamentoSql?.dataValues

  const ciudadGuardar:ICiudad = {
    nombre: objetoCiudadSql.nombre,
    departamento: departamentoSql?.dataValues.nombre,
    pais: pais?.dataValues.nombre,
  }
  
  const {identificacion, email, nombres, apellidos, tipo_empleado} = objetoAsistenteSql
  const asistentesGuardar:IAsistentes = {
    idAsistente: identificacion,
    usuario:email,
    nombreCompleto: `${nombres} ${apellidos}`,
    relacionInstitucion: tipo_empleado,
    email: email,
    ciudad: ciudadGuardar
  }
  const eventoGuardar:IEvento = {
    titulo,
    descripcion,
    categoria,
    fecha: new Date(fecha),
    lugar: lugar + "-"+ nombreSede,
    facultadOrganizadora: objetoFacultadSql,
    asistentes: asistentesGuardar,
  } 
  const evento = new Evento(eventoGuardar)
  
  try {
    await evento.save();
    res.json({
      resp: "Evento creado",
      evento,
      body: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};


export const eliminarEvento = async (req: Request, res: Response) => {
  try {
    const eventos = await Evento.find();
    res.json({
      eventos,
      body: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};

export const actualizarEvento = async (req: Request, res: Response) => {
  const { titulo, descripcion, categoria, fecha, lugar } = req.body;
  const { ciudad, asistente, sede,  facultadorganizadora } = req.headers;
  const {id} = req.params
  
  
  const ciudadSQl = await Ciudad.findOne({
    where: {
      codigo: ciudad,
    },
    attributes: {exclude:['cod_departamento']},
    include: [
      {
        model: Departamento,
        required:true,
        right:true,
        attributes: {exclude:['cod_pais']},
        as:'departamento',
        include:[{
            model: Pais,
            required:true,
            right:true,
            as: 'pais',
        }]
      },
    ],
  });
  const asistenteSql = await Empleados.findOne({
    where: { identificacion: asistente },
    include:[{
        model: Facultades,
        required:true,
        right:true,
    },{
        model: Sedes,
        required:true,
        right:true,
    },{
        model: Ciudad,
        required:true,
        right:true,
    }]
  });

  const sedeSql = await Sedes.findOne({where: {codigo: sede}})
  const facultadSql = await Facultades.findOne({where: {codigo: facultadorganizadora}})

  const objetoCiudadSql = ciudadSQl?.dataValues;
  const objetoAsistenteSql = asistenteSql?.dataValues;
  
  const {nombre:nombreSede} = sedeSql?.dataValues;
  const objetoFacultadSql = facultadSql?.dataValues;
  
  const  departamentoSql= objetoCiudadSql?.departamento;
  const {pais} = departamentoSql?.dataValues

  const ciudadGuardar:ICiudad = {
    nombre: objetoCiudadSql.nombre,
    departamento: departamentoSql?.dataValues.nombre,
    pais: pais?.dataValues.nombre,
  }

  const {identificacion, email, nombres, apellidos, tipo_empleado} = objetoAsistenteSql
  const asistentesGuardar:IAsistentes = {
    idAsistente: identificacion,
    usuario:email,
    nombreCompleto: `${nombres} ${apellidos}`,
    relacionInstitucion: tipo_empleado,
    email: email,
    ciudad: ciudadGuardar
  }
  const eventoGuardar:IEvento = {
    titulo,
    descripcion,
    categoria,
    fecha: new Date(fecha),
    lugar: lugar + "-"+ nombreSede,
    facultadOrganizadora: objetoFacultadSql,
    asistentes: asistentesGuardar,
  } 
  
  try {
    const evento = await Evento.findByIdAndUpdate(id,eventoGuardar)
    res.json({
      resp: "Evento Actualizado",
      evento,
      body: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
    });
  }
};