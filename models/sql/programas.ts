import {DataTypes} from 'sequelize'
import db from '../../db/connection'

const Programa = db.define('programas',{
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
export default Programa;