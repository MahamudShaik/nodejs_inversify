import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost,
    response,
    requestParam,
    requestBody
} from "inversify-express-utils";
import { Repository } from "typeorm";
import { TYPES } from "../../constants/types";
import { User } from "../../domain/User";


@controller('/user')
export class UserController {

    public readonly _userRepository: Repository<User>;

    constructor(@inject(TYPES.UserRepository) userRepository: Repository<User>) {
        this._userRepository = userRepository;
    }

    @httpGet('/')
    public async getUsers(@response() res: express.Response) {

        try {
            return await this._userRepository.find();
        }
        catch (ex) {
            res.status(500);
            res.send(ex.message);
        }
    }

    @httpGet('/:id')
    public async getUser(@response() response: express.Response, @requestParam("id") id: string) {
        try {

            return this._userRepository.findOne({ id })

        }
        catch (e) {
            response.status(500);
            response.send(e.message);
        }
    }

    @httpPost('/')
    public newUser(@response() response: express.Response, @requestBody() newUser: User) {
        try {
            console.log(newUser);
            return this._userRepository.save(newUser);

        }
        catch (e) {
            response.status(500);
            response.send(e.message);
        }

    }
}
