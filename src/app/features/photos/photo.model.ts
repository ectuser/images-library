export interface PhotoResponse {
  message: string[];
  status: string;
}

export interface PhotoWithStatus {
  url: string;
  isFavorite: boolean;
}
