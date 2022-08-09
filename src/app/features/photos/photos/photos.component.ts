import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';

@Component({
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent {
  photos$ = of([
    'https://images.dog.ceo/breeds/pitbull/20190710_143021.jpg',
    'https://images.dog.ceo/breeds/weimaraner/n02092339_3028.jpg',
    'https://images.dog.ceo/breeds/germanshepherd/n02106662_684.jpg',
    'https://images.dog.ceo/breeds/spaniel-japanese/n02085782_1156.jpg',
    'https://images.dog.ceo/breeds/tervuren/yoda_on_terrace.jpg',
    'https://images.dog.ceo/breeds/leonberg/n02111129_545.jpg',
  ]);
}
