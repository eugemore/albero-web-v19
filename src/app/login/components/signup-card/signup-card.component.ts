import { Component, inject, output, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  private readonly router = inject(Router);

  readonly signupOutput = output<void>();

  protected readonly signUpError = signal<string | null>(null);

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

    this.authService.signUp({ email, password }).subscribe((res) => {
      if (res instanceof HttpErrorResponse) {
        this.signUpError.set(res.error as string);
      } else {
        this.router.navigateByUrl('/chart');
      }
    });
  }
}