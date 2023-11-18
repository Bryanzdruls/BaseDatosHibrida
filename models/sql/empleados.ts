import {DataTypes} from 'sequelize'
import db from '../../db/connection'

const Empleados = db.define('empleados',{
    identificacion: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    nombres: {
        type: DataTypes.STRING,
    },
    apellidos: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    }
},{
    timestamps:false,
});
export default Empleados;