require('dotenv').config();
import * as http from "http";
import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import {log, morganInstance} from "./services/logger";
import RegisterRoute from "./routes/register.routes";

let Config = require('./config');
const mongoUrl: string = Config.server.mongoDBConnectionUrl;
const PORT: number = Config.server.port;

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        const server = http.createServer(this.app);
        server.listen(PORT, () => {
            log.info('Server is running on port ', PORT);
        });
        this.config();
        //this.mongoSetup();
    }

    private config(): void {
        this.app.use(morganInstance);
        /*this.app.use(cors({
            origin: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Origin', ' X-Requested-With', ' Content-Type', ' Accept ', ' Authorization'],
            credentials: true
        }));*/
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false, limit: 50 * 1000}));

        //Register Routers.
        this.registerRoutes();

        //Mongo setup
        this.mongoSetup();

        //Start static serving.
        this.app.use(express.static('public'));
    }

    private registerRoutes(): void {

        this.app.use('/', RegisterRoute);
    }
    private mongoSetup(): void {

        // @ts-ignore
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
            log.info('DATABASE - Connected');
        });

        mongoose.connection.on('error', (err) => {
            log.error('DATABASE - Error:' + err);
        });

        mongoose.connection.on('disconnected', () => {
            log.warn('DATABASE - disconnected  Retrying....');
        });

        const dbOptions = {
            poolSize: 5,
            reconnectTries: Number.MAX_SAFE_INTEGER,
            reconnectInterval: 500,
            useNewUrlParser: true
        };let response;
        mongoose.connect(mongoUrl, dbOptions)
            .catch(err => {
                log.fatal('DATABASE - Error:' + err);
            });
    }

}

export default new App().app;
