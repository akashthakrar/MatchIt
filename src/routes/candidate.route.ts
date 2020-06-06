import {Router} from "express";
import {CandidateController} from "../controllers/candidate.controller";

class CandidateRoutes {
    //Get Controller.
    public CandidateAuthController: CandidateController = new CandidateController();
    public router: Router;

    constructor() {
        this.router = Router();
        this.registerMethods();
    }

    registerMethods() {
        //Register All methods here.
        this.router.get('/', this.CandidateAuthController.giveRootResponse);
        this.router.get('/add', this.CandidateAuthController.createCandidate);
        // this.router.post('/login', this.CandidateAuthController.login);
        // this.router.post('/forgotPassword', this.CandidateAuthController.forgetPassword);
        // this.router.post('/changeForgotPassword', this.CandidateAuthController.changeForgetPassword);
    }
}

export default new CandidateRoutes().router;
