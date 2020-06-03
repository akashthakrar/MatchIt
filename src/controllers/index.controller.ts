import {Request, Response,NextFunction} from 'express';

export class IndexController {
    public giveRootResponse(req: Request, res: Response) {
        res.send("Hello, This is root");
    }
}
