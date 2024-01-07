import { fork } from "child_process";
import { Response, Request } from "express";
import Utils from "../../utils";
import { apiSuccessMessage } from "../../common/constants";
import path from "path";

class bl {
    async currencyConverter ( request: Request, response: Response ) {
        const rootDir = (global as unknown as {rootDir: string}).rootDir
        const AxiosForked = fork( path.join(rootDir, "./workers/axiosServiceWorker") )
        AxiosForked.send( JSON.stringify( {
            method: "GET",
            headers: {
                'X-CMC_PRO_API_KEY': process.env.SECRET_KEY,
                },
                url: "https://pro-api.coinmarketcap.com/v2/tools/price-conversion",
            params: request.query
        }))

        AxiosForked.on( "message", (message) => {
            Utils.response(response, message, apiSuccessMessage.FETCH_SUCCESS, true, 200)
        })
    }
}


export default bl;