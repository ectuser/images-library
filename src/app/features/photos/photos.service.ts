import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PhotoResponse } from './photo.model';
import { PhotosApiService } from './photos-api.service';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private imagesSubject$ = new BehaviorSubject<string[]>([]);

  get images$(): Observable<string[]> {
    return this.imagesSubject$.asObservable();
  }

  constructor(private photosApiService: PhotosApiService) {}

  loadImages(): Observable<PhotoResponse> {
    return this.photosApiService.getImages().pipe(
      tap((response) => {
        this.imagesSubject$.next(response.message);
      })
    );
  }
}
