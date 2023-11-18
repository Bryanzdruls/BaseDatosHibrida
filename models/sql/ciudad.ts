import {DataTypes} from 'sequelize'
import db from '../../db/connection'

const Ciudad = db.define('ciudades',{
    codigo: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.STRING,
    }
},{
    timestamps:false,
});
export default Ciudad;