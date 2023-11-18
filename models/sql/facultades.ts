import {DataTypes} from 'sequelize'
import db from '../../db/connection'

const Facultades = db.define('facultades',{
    codigo: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    ubicacion:{
        type: DataTypes.STRING,
    },
    nro_telefono:{
        type: DataTypes.STRING,
    }
},{
    timestamps:false,
});
export default Facultades;