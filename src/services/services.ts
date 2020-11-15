import { IHttpService } from '@/services/HttpService/interfaces/IHttpService';
import { DiceAPIResponse } from '@/common/interfaces/DiceAPIResponse';
import { CONSTANTS } from '@/common/CONSTANTS';
import { HttpService } from '@/services/HttpService/HttpService';

export const httpService: IHttpService<DiceAPIResponse> = new HttpService(CONSTANTS.BASE_DICE_API_URL);
