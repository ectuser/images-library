import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CONFIG_TOKEN } from '../../core/injection-tokens/config';
import { Config } from '../../../environments/config.model';
import { PhotoResponse } from './photo.model';
import { delay, Observable } from 'rxjs';

const numberOrImages = 6;

@Injectable({
  providedIn: 'root',
})
export class PhotosApiService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config, private httpClient: HttpClient) {}

  getImages(): Observable<PhotoResponse> {
    return this.httpClient.get<PhotoResponse>(this.config.apiEndpoints.photos + `/random/${numberOrImages}`).pipe(delay(300));
  }
}
