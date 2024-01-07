import expressApp from "express";
import routes from "./routes"
import Utils from "./app/utils";
import cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config();

const app = expressApp()

// @ts-ignore
global.rootDir = __dirname;
app.use( cors( {
    origin: "*"
}))
app.use( routes )

app.listen(3001, () => {
    Utils.lhtLog("Currency Converter", `Server is running on port 3001`, {}, "Suraj")
})