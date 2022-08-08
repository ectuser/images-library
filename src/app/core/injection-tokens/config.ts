import { InjectionToken } from '@angular/core';
import { Config } from '../../../environments/config.model';

export const CONFIG_TOKEN = new InjectionToken<Config>('CONFIG_TOKEN');
