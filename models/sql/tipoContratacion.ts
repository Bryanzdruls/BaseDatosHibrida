import {DataTypes} from 'sequelize'
import db from '../../db/connection'

const tiposContratacion = db.define('tipos_contratacion',{
    nombre: {
        primaryKey: true,
        type: DataTypes.STRING,
    }
},{
    tableName:'tipos_contratacion',
    timestamps:false,
});
export default tiposContratacion;