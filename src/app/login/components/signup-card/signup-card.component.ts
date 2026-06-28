import { Component, inject, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../shared/services/auth.service';
import { confirmPasswordValidator } from '../../../shared/validators/confirm-password.validator';

@Component({
  selector: 'app-signup-card',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './signup-card.component.html',
  styleUrl: './signup-card.component.sass',
})
export class SignupCardComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);

  readonly signupOutput = output<void>();

  protected readonly registerMessage = signal<string | null>(null);
  protected readonly registerError = signal<string | null>(null);

  protected readonly form = this.fb.group(
    {
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: [confirmPasswordValidator()] },
  );

  protected signup(): void {
    if (!this.form.valid) return;
    const { email, password } = this.form.getRawValue();

    this.authService.register({ email, password }).subscribe({
      next: msg => this.registerMessage.set(msg),
      error: (err: { message?: string }) =>
        this.registerError.set(err?.message ?? 'Registration failed. Please try again.'),
    });
  }
}