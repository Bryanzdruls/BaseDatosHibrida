import {DataTypes} from 'sequelize'
import db from '../../db/connection'
const Sedes = db.define('sedes',{
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
export default Sedes;