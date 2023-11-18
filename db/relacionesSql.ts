import db from './connection';
import { Pais,Departamento, Ciudad, Programas, Areas, Facultades } from '../models';
import Empleados from '../models/sql/empleados';
import tiposEmpleado from '../models/sql/tipoEmpleado';
import tiposContratacion from '../models/sql/tipoContratacion';
import Sedes from '../models/sql/Sedes';

const relacionar = async() =>{
    //Relaciones
    Departamento.belongsTo(Pais,{
        as:'pais',
        foreignKey: "cod_pais"
    });

    Ciudad.belongsTo(Departamento,{
        as:'departamento',
        foreignKey:'cod_departamento'
    })

    Sedes.belongsTo(Ciudad,{
        foreignKey:'cod_ciudad'
    })
    Programas.belongsTo(Areas,{
        foreignKey: 'areas_codigo'
    })

    Areas.belongsTo(Facultades,{
        foreignKey:'facultades_codigo'
    })


    //facu
    Empleados.belongsTo(Facultades,{
        foreignKey:'cod_facultad'
    })
    //tipos
    Empleados.belongsTo(tiposEmpleado,{
        foreignKey:'tipo_empleado'
    })
    Empleados.belongsTo(tiposContratacion,{
        foreignKey:'tipo_contratacion'
    })
    //sede
    Empleados.belongsTo(Sedes,{
        foreignKey:'codigo_sede'
    })
    //lugarnac
    Empleados.belongsTo(Ciudad,{
        foreignKey:'lugar_nacimiento'
    })
    //PELIGROOOOOOOOO
   try {
        db.sync({alter:true}).then(()=>{
            console.log('Sincronizado');
        })
    } catch (error) {
        console.log(error);        
    }
   
}
export default relacionar;
