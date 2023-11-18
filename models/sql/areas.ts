import {DataTypes} from 'sequelize'
import db from '../../db/connection'
const Areas = db.define('areas',{
    codigo: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    id_coordinador:{
        type: DataTypes.STRING,
    }
},{
    timestamps:false,
});
export default Areas;