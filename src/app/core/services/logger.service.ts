import { Inject, Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { CONFIG_TOKEN } from '../../core/injection-tokens/config';
import { Config } from '../../../environments/config.model';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config) {}

  error(message: unknown): Observable<unknown> {
    if (!this.config.production) {
      console.error(message);
    }

    if (!this.config.features.logging) {
      return EMPTY;
    }
    return of(message);
  }
}
