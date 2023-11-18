import {Sequelize} from 'sequelize';


const db = new Sequelize('finalBD2','postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
    logging:false,
});

export default db;