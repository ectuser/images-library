import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';
import { PhotoResponse } from './photo.model';
import { PhotosApiService } from './photos-api.service';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private imagesSubject$ = new BehaviorSubject<string[]>([]);
  private isLoadingSubject$ = new BehaviorSubject(false);

  get images$(): Observable<string[]> {
    return this.imagesSubject$.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this.isLoadingSubject$.asObservable();
  }

  constructor(private photosApiService: PhotosApiService) {}

  loadImages(): Observable<PhotoResponse> {
    this.isLoadingSubject$.next(true);

    return this.photosApiService.getImages().pipe(
      tap((response) => {
        this.imagesSubject$.next([...this.imagesSubject$.value, ...response.message]);
      }),
      finalize(() => {
        this.isLoadingSubject$.next(false);
      })
    );
  }
}
