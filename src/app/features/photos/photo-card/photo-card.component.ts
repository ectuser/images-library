import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoCardComponent {
  @Input() imageUrl?: string;
  @Input() isFavorite = false;
  @Output() selectImage = new EventEmitter();
}
