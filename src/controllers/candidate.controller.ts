import {Request, Response} from 'express';
import Candidate from '../models/candidate.model';
import {log} from "../services/logger";

export class CandidateController {
    public giveRootResponse(req: Request, res: Response) {
        res.send("Hello, This is root");
    }
    public createCandidate (req: Request, res: Response){
        log.info("here");
        let candidate = new Candidate({
            firstName: "Akash",
            lastName: "Thakrar",
            email: "akashthakrar4@gmail.com",
            phoneNumber: "8866667570"

        });
        candidate.save().then(candidate=>{
            res.send({
                status: "SUCCESS",
                message: candidate
            })
        }).catch(e => {
            res.status(500).json({
                message: e
            });
        });
    }

}
