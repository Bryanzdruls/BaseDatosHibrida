import {Sequelize} from 'sequelize';

const db = new Sequelize("postgres://gbdmpizs:yaEolVcU4q7zoqbGcYzuYwi37RDK86M4@flora.db.elephantsql.com/gbdmpizs")


export default db;
/*const db = new Sequelize('finalBD2','postgres', 'yaEolVcU4q7zoqbGcYzuYwi37RDK86M4', {
    host: 'localhost',
    dialect: 'postgres',
    logging:false,
});*/