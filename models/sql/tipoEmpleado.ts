import {DataTypes} from 'sequelize'
import db from '../../db/connection'

const tiposEmpleado = db.define('tipos_empleado',{
    nombre: {
        primaryKey: true,
        type: DataTypes.STRING,
    }
},{
    tableName:'tipos_empleado',
    timestamps:false,
});
export default tiposEmpleado;