const  mongoose = require('mongoose');

const dbMongo = async() =>{
    try {
        await mongoose.connect( process.env.MONGO_CNN);
        
        console.log('DB MONGO ONLINE');
    } catch (error) {
        const errormsg = (error as Error).message;
        console.error('Error de coneccion de MONGO: '+errormsg);
        
    }
}
export default  dbMongo