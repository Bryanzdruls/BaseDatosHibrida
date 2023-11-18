import {DataTypes} from 'sequelize'
import db from '../../db/connection'

const Departamento = db.define('departamentos',{
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
export default Departamento;