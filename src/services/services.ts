import { IHttpService } from '@/services/HttpService/interfaces/IHttpService';
import { DiceAPIResponse } from '@/common/interfaces/DiceAPIResponse';
import { CONSTANTS } from '@/common/CONSTANTS';
import { HttpService } from '@/services/HttpService/HttpService';
import { ISplashService } from '@/services/SplashService/interfaces/ISplashService';
import { SplashService } from '@/services/SplashService/SplashService';

export const httpService: IHttpService<DiceAPIResponse> = new HttpService(CONSTANTS.BASE_DICE_API_URL);
export const splashService: ISplashService = new SplashService();
