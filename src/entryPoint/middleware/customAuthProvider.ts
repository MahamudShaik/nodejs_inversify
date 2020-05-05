import { interfaces } from "inversify-express-utils";
import * as express from 'express';
import { injectable } from "inversify";

@injectable()
export class CustomAuthProvider implements interfaces.AuthProvider {


    getUser(req: express.Request, res: express.Response, next: express.NextFunction): Promise<interfaces.Principal> {

        const user = {
            id: '1',
            Authenticated: true,
            role: "admin"
        }
        return new Promise(function (resolve) {
            resolve(new Principal(user));
        });
    }

}

export class Principal implements interfaces.Principal {
    details: any;

    constructor(details: any) {
        this.details = details;
    }
    isAuthenticated(): Promise<boolean> {
        return Promise.resolve(this.details.role === "admin")
    }
    isResourceOwner(resourceId: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    isInRole(role: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }


}


export async function AuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('middlware');
    if (false) {
        next()
    }
    else {
        res.status(403).json("forbidden");
        res.end();
    }
}