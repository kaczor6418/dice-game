import { IHttpService } from './interfaces/IHttpService';
import { HttpServiceResponse } from './interfaces/HttpServiceResponse';
import { HttpRequestMethods } from './interfaces/HttpRequestMethods';

export class HttpService<T> implements IHttpService<T> {
  private readonly baseUrl: string;

  private url = '';
  private options: RequestInit = {};

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get(url: string, options: RequestInit = {}): Promise<HttpServiceResponse<T>> {
    options.method = HttpRequestMethods.GET;
    this.setRequestUrlAndOptions(url, options);
    return await this.getRequestResponse();
  }

  private setRequestUrlAndOptions(url: string, options: RequestInit = {}): void {
    this.url = `${this.baseUrl}${url}`;
    this.options = options;
  }

  private async getRequestResponse(): Promise<HttpServiceResponse<T>> {
    const response: Response = await fetch(this.url, this.options);
    if (this.isValidResponse(response)) {
      const resource: T = await response.json();
      return {
        resource,
        response
      };
    } else {
      throw new Error(`Could not fetch data from url: ${this.url}. Request finished with status code: ${response.status}`);
    }
  }

  private isValidResponse({ status }: Response): boolean {
    return status >= 200 && status < 400;
  }
}
