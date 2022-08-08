export type ApiEndpoint = 'photos';

export interface Config {
  production: boolean;
  apiEndpoints: Record<ApiEndpoint, string>;
}
