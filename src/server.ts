import express from 'express';
import router from './router';
import { sequelize } from '../models/model.js';

export default class Server {

    public app: express.Application;
    public serviceName: string;

    constructor(environment: string = 'dev') {
        this.serviceName = `Deel-${environment}`;
        this.app = express();
        this.configService();
    }

    private configService() {
        this.app.use(express.json());
        this.app.use(this.responseHandler);
        this.app.set('sequelize', sequelize);
        this.app.set('models', sequelize.models);
        this.app.use('/api', router);
    }

    private responseHandler(serverResponse: any, req: any, res:any, next: any): void {
        if(serverResponse.statusCode) {
            return res.status(serverResponse.statusCode).send(serverResponse.body);
        }
    }

}