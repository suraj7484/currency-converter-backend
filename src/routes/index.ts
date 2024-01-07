import { Router } from "express";
import v1 from "./v1"
import v2 from "./v2"
import { stringConstants } from "../app/common/constants";

const route = Router()

route.get("/", (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML) )

route.use( "/api/v1", v1 );
route.use( "/api/v2", v2 );


export default route;