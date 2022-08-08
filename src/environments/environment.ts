import { Config } from './config.model';

export const environment: Config = {
  production: false,
  apiEndpoints: {
    photos: 'https://dog.ceo/api/breeds/image',
  },
  features: {
    loadPhotos: true,
    logging: false,
  },
};
