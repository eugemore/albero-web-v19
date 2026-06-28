import { Component, inject, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.sass',
})
export class LoginCardComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly signupOutput = output<void>();

  protected readonly wrongPassword = signal(false);

  protected readonly form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected login(): void {
    if (!this.form.valid) return;
    const { email, password } = this.form.getRawValue();

    this.authService.login({ email, password }).subscribe({
      next: () => this.router.navigateByUrl('/chart'),
      error: () => this.wrongPassword.set(true),
    });
  }
}