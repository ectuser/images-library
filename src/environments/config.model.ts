export type ApiEndpoint = 'photos';
export type AppFeature = 'loadPhotos' | 'logging';

export interface Config {
  production: boolean;
  apiEndpoints: Record<ApiEndpoint, string>;
  features: Record<AppFeature, boolean>;
}
