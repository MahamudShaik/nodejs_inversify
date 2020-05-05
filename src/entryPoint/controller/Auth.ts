import { BaseHttpController, controller, httpGet } from "inversify-express-utils";
import { AuthMiddleware } from "../middleware/customAuthProvider";
//import { AuthMiddleware } from "../middleware/customAuthProvider";

@controller('/auth', AuthMiddleware)
export class AuthController extends BaseHttpController {

    @httpGet('/')
    public async get() {
        console.log(this.httpContext.user.isAuthenticated());
        console.log(this.httpContext.user.details)
        if (await this.httpContext.user.isAuthenticated()) {

            const token = this.httpContext.request.headers["authorization"];
            return this.ok(token);
        }
        else {

            return this.json("UNAuthorized", 401);
        }
    }
}