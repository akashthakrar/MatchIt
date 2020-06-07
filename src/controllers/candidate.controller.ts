import { Request, Response } from "express";
import Candidate from "../models/candidate.model";
import { log } from "../services/logger";

export class CandidateController {
    public giveRootResponse(req: Request, res: Response) {
        res.send("Hello, This is root");
    }
    public createCandidate(req: Request, res: Response) {
        let candidate = new Candidate({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
        });
        candidate
            .save()
            .then((candidate) => {
                res.send({
                    status: "SUCCESS",
                    message: candidate,
                });
            })
            .catch((e) => {
                res.status(500).json({
                    message: e,
                });
            });
    }
    public updateCandidate(req: Request, res: Response) {
        Candidate.updateOne(
            { seq: req.body.seq },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    middleName: req.body.middleName,
                    birthDate: req.body.birthDate,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    gender: req.body.gender,
                },
            },
            { new: true }
        )
            .then((candidate) => {
                //console.log(candidate1);
                res.send({
                    status: "SUCCESS",
                    message: candidate,
                });
            })
            .catch((e) => {
                res.status(500).json({
                    message: e,
                });
            });
    }
    public getCandidate(req: Request, res: Response) {
        let seq = req.params.seq;
        //console.log(seq);
        Candidate.findOne({ seq: seq })
            .then((candidate) => {
                res.send({
                    status: "SUCCESS",
                    message: candidate,
                });
            })
            .catch((e) => {
                res.status(500).json({
                    message: e,
                });
            });
    }
}
