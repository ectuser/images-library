import { Config } from './config.model';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    photos: 'https://dog.ceo/api/breeds/image',
  },
};
