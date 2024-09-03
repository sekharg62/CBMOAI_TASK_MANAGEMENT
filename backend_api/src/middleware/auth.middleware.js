import { JWT_TOKEN, statusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js"
import Jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
    if(req.headers['auth'] === undefined){
        return res.json(jsonGenerate(statusCode.AUTH_ERROR,"access denied"));
    }

    const token = req.headers['auth'];
    //console.log(token)

    try {
        const decoded = Jwt.verify(token,JWT_TOKEN);
        console.log(decoded);

        req.userId = decoded.userId;
        
        //console.log("req.userId",req.userId);

        return next();

    } catch (error) {
        return res.json(jsonGenerate(statusCode.UNPROCESSABLE_ENTITY,"Invalid token"));
    }

}

export default AuthMiddleware;