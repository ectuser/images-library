import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MaterialModule],
})
export class PhotoCardComponent {
  @Input() imageUrl?: string;
  @Input() isFavorite = false;
  @Output() selectImage = new EventEmitter();

  click(): void {
    if (!this.isFavorite) {
      this.selectImage.emit();
    }
  }
}
