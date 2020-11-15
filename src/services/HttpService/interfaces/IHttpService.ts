import { HttpServiceResponse } from './HttpServiceResponse';

export interface IHttpService<T> {
  get(url: string, options?: RequestInit): Promise<HttpServiceResponse<T>>;
}
