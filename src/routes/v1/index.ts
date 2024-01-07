import { Router } from "express";
import CurrencyController from "../../app/module/currency";
import CurrencyCoverterController from "../../app/module/converter";

const route = Router()

route.get( "/crypto-currency-list", new CurrencyController().fetchCurrencyList )
route.get( "/crypto-currency-converter", new CurrencyCoverterController().currencyConverter )

export default route;