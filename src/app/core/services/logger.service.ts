import { Inject, Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { CONFIG_TOKEN } from '../../core/injection-tokens/config';
import { Config } from '../../../environments/config.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config, private httpClient: HttpClient) {}

  error(message: unknown): Observable<unknown> {
    if (!this.config.production) {
      console.error(message);
    }

    if (!this.config.features.logging) {
      console.log('Logging feature is turned off');

      return of(message);
    }
    return this.httpClient.get(this.config.apiEndpoints.log).pipe(map(() => message));
  }
}
