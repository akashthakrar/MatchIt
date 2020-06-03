import {Router} from "express";

/*import UserAuthRoutes from "./userAuth.route";
import UserRoute from "./user.rotue";
import BotRoute from "./botManagement.route";*/
import IndexRoute from "./index.routes";
import CandidateRoute from "./candidate.route";
// import FbRoutes from "./fb.routes";

class IndexRoutes {

    //Get Controller.
    public router: Router;

    constructor() {
        this.router = Router();
        this.registerMethods();
    }

    registerMethods() {
        this.router.use('/', IndexRoute);
        //Register All methods here.
        this.router.use('/candidate',CandidateRoute);
        /*this.router.use('/auth', UserAuthRoutes);
        this.router.use('/user', UserRoute);
        this.router.use('/bot', BotRoute);
        this.router.use('/fb', FbRoutes);*/


    }
}

export default new IndexRoutes().router;
