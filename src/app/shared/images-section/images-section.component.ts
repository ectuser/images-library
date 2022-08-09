import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { PhotoWithStatus } from '../../features/photos/photo.model';
import { PhotoCardComponent } from '../photo-card/photo-card.component';

@Component({
  selector: 'app-images-section',
  standalone: true,
  imports: [CommonModule, MaterialModule, PhotoCardComponent],
  templateUrl: './images-section.component.html',
  styleUrls: ['./images-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesSectionComponent {
  @Input() photos: PhotoWithStatus[] = [];

  @Output() imageClicked = new EventEmitter<string>();
}
