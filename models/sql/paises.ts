import {DataTypes} from 'sequelize'
import db from '../../db/connection'

const Pais = db.define('paises',{
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
export default Pais;