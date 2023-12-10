import express, {Application} from 'express';
import  * as eventosRoutes from '../routes/eventos';
import cors from 'cors';

import dbSql from '../db/connection';
import dbMongo from '../db/conectionMongo'
import relacionar from '../db/relacionesSql';

export class Server {
    private app: Application;
    private port: string;
    private apiPaths= {
        usuario: '/api/usuario',
        eventos: '/api/eventos'
    };

    constructor(){
        this.app =express();
        this.port =process.env.PORT || '8000';
        //db
        this.connectionSQL();
        this.connectionMONGO();
        //middlewares
        this.middlewares();
        //rutas
        this.routes();
        
    }
    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use(express.json());


        // Carpeta pública
        this.app.use( express.static('public') );
    }
    routes(){
        this.app.use(this.apiPaths.eventos, eventosRoutes.default)
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor en puerto '+ this.port);    
        })
    }
    async connectionSQL(){
        try {
            await dbSql.authenticate();
            console.log('DB SQL ONLINE');
            //PEPELIGRO
            await relacionar();      
        } catch (error:any) {
            throw new Error(error);            
        }
    }
    async connectionMONGO(){
        try {
            await dbMongo();

        } catch (error:any) {
            throw new Error(error);            
        }
    }
}