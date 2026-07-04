import {
  AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2, inject,
} from '@angular/core';

/**
 * Revela el elemento con un fade-up cuando entra en viewport.
 * Respeta prefers-reduced-motion. Uso: <div appReveal [revealDelay]="80">
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0;

  private el = inject(ElementRef<HTMLElement>);
  private r = inject(Renderer2);
  private io?: IntersectionObserver;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.r.addClass(node, 'reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      this.r.addClass(node, 'reveal--in');
      return;
    }

    this.io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setTimeout(() => this.r.addClass(node, 'reveal--in'), this.revealDelay);
          this.io?.unobserve(node);
        }
      }
    }, { threshold: 0.18 });

    this.io.observe(node);
  }

  ngOnDestroy(): void { this.io?.disconnect(); }
}
