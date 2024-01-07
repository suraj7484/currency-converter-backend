import { Response } from 'express';
import { apiFailureMessage, httpConstants } from '../common/constants';

interface ResponseObject {
  responseData: any;
  message: string;
  success: boolean;
  responseCode: number;
}

interface ValidationErrorObject {
  message: string;
  errors: string[];
  success: boolean;
  responseCode: number;
}

class Utils {
  static response(res: Response, data: any, message: string, success: boolean, code: number): void {
    const responseObj: ResponseObject = {
      responseData: data,
      message: message,
      success: success,
      responseCode: code,
    };
    res.format({
      json: () => {
        res.status(code).send(responseObj);
      },
    });
  }

  static normalResponse(res: Response, message: string): void {
    const responseObj: string = message;
    res.format({
      json: () => {
        res.send(responseObj);
      },
    });
  }

  static responseForValidation(res: Response, errorArray: string[], success: boolean, code: number = 400): void {
    const responseObj: ValidationErrorObject = {
      message: 'Invalid Request',
      errors: errorArray,
      success: success,
      responseCode: code,
    };
    res.format({
      json: () => {
        res.send(responseObj);
      },
    });
  }

  static handleError(err: any, req: any, res: Response): void {
    if (!res) {
      return;
    }
    err = err || {};
    const msg = err.message ? err.message : apiFailureMessage.INTERNAL_SERVER_ERROR;
    const errorCode = err.code ? err.code : httpConstants.RESPONSE_CODES.SERVER_ERROR;
    this.response(res, {}, msg, httpConstants.RESPONSE_STATUS.FAILURE, errorCode);
  }

  static error(data: any, message: string, code: number = 500): { data: any; message: string; code: number } {
    return {
      data: data,
      message: message,
      code: code,
    };
  }

  static getFormattedDate(): string {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  static lhtLog(functionName: string, message: string, payload: any, developerAlias: string, logType: string = 'INFO'): void {
    console.log(`[ ${this.getFormattedDate()} ] ${logType}: ${functionName}: ${message}: ${JSON.stringify(payload)}: Developer : ${developerAlias}`);
  }

  static func = (fn: (req: any, res: Response, next: any) => Promise<void>) => {
    return (req: any, res: Response, next: any): void => {
      fn(req, res, next).catch(next);
    };
  };

}

export default Utils;
