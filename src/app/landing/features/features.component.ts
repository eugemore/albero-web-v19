import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { Feature, FEATURES } from './feature.model';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [MatCardModule, MatIconModule, RevealDirective],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  readonly features: Feature[] = FEATURES;
}
