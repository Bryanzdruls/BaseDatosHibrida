import express, {Application} from 'express'
import * as userRoutes from '../routes/user';
import cors from 'cors';
import db from '../db/connection';
export class Server {
    private app: Application;
    private port: string;
    private apiPaths= {
        users: '/api/users'
    };

    constructor(){
        this.app =express();
        this.port =process.env.PORT || '8000';

        //rutas
        this.routes();
        //middlewares
        this.middlewares();
        //db
        this.connection();
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
        this.app.use(this.apiPaths.users, userRoutes.default)
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('server in port '+ this.port);    
        })
    }
    async connection(){
        try {
            await db.authenticate();
            console.log('DB ONLINE');
            
        } catch (error:any) {
            throw new Error(error);            
        }
    }
}