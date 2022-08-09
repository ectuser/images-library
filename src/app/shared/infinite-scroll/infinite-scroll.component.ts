import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollComponent implements OnDestroy, AfterViewInit {
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchorToReach') anchorToReach!: ElementRef<HTMLElement>;

  private observer?: IntersectionObserver;

  get element(): HTMLElement {
    return this.host.nativeElement as HTMLElement;
  }

  constructor(private host: ElementRef) {}

  ngAfterViewInit(): void {
    const options = {
      root: this.isHostScrollable() ? this.element : null,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.scrolled.emit();
      }
    }, options);

    this.observer.observe(this.anchorToReach.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private isHostScrollable(): boolean {
    const style = window.getComputedStyle(this.element);

    const result = style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';

    return result;
  }
}
