import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { FeaturesComponent } from './features/features.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeroComponent, FeaturesComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {}
