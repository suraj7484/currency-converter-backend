import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface HeavyAxioOptions {
  method: string;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

const heavyAxioOperations = async ({
  method,
  url,
  headers,
  params,
}: HeavyAxioOptions): Promise<any> => {
  try {
    const axiosOptions: AxiosRequestConfig = {
      method,
      headers,
      params,
      url: url
    };

    const callResponse: AxiosResponse = await axios(axiosOptions);

    return callResponse.data;
  } catch (err) {
    const errorResponse = (err as { response?: any })?.response?.data;
    return errorResponse;
  }
};

process.on( "message", async (message:string) => {
    const parsedMessage = JSON.parse( message )
    const callResponse = await heavyAxioOperations( parsedMessage );
    process.send!(callResponse)
})

