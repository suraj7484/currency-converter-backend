import { Router } from "express";

const route = Router()

route.get( "/", (req, res) => { res.send("V2 ----") } )

export default route;