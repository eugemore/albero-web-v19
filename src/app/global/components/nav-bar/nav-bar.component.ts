import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isLoggedIn = toSignal(this.authService.loggedInSubject, {
    initialValue: false,
  });

  protected goHome(): void {
    this.router.navigateByUrl(this.isLoggedIn() ? '/chart' : '/');
  }

  protected logOut(): void {
    this.authService.logout();
  }
}
