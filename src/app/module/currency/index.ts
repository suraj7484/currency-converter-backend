import { apiFailureMessage, apiSuccessMessage, httpConstants, genericConstants } from "../../common/constants"
import { Response, Request } from "express";
import bl from "./bl";
import Utils from "../../utils";

class CurrencyController {
    async fetchCurrencyList (request:Request , response:Response) {
        try {
            await new bl().fetchCryptoCurrencyList( request, response )
        } catch ( err ) {
            Utils.handleError(err, request, response)
        }
    }
}

export default CurrencyController