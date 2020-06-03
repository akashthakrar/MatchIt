import {Router} from "express";
import {IndexController} from "../controllers/index.controller";

class IndexRoutes {

    //Get Controller.
    public indexController: IndexController = new IndexController();
    public router: Router;

    constructor() {
        this.router = Router();
        this.registerMethods();
    }

    registerMethods() {
        //Register All methods here.
        this.router.get('/', this.indexController.giveRootResponse);
    }
}

export default new IndexRoutes().router;
