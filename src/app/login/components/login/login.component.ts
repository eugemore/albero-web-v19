import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LoginCardComponent } from '../login-card/login-card.component';
import { SignupCardComponent } from '../signup-card/signup-card.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, LoginCardComponent, SignupCardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  protected readonly signup = signal(false);

  protected toggleCard(): void {
    this.signup.update(v => !v);
  }
}