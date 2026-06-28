import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const pass = form.value['password'];
    const confPass = form.value['confirmPassword'];
    return pass === confPass ? null : { differentPasswords: true };
  };
}