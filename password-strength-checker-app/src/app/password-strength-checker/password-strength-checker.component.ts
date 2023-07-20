import { Component } from '@angular/core';

@Component({
  selector: 'app-password-strength-checker',
  templateUrl: './password-strength-checker.component.html',
  styleUrls: ['./password-strength-checker.component.css']
})
export class PasswordStrengthCheckerComponent {
  password: string = '';

  checkPasswordStrength(): string {
    if (this.password.length === 0) return 'gray';
    if (this.password.length < 8) return 'red';

    const containsLetters = /[a-zA-Z]/.test(this.password);
    const containsDigits = /\d/.test(this.password);
    const containsSymbols = /[^a-zA-Z0-9]/.test(this.password);

    if (containsLetters && containsDigits && containsSymbols) return 'green';
    if (containsLetters && (containsSymbols || containsDigits)) return 'yellow';


    return 'red';
  }

  getPasswordStrengthText(): string {
    if (this.password.length === 0) return 'Password strength: ';
    if (this.password.length < 8) return 'Password strength: Invalid';

    const containsLetters = /[a-zA-Z]/.test(this.password);
    const containsDigits = /\d/.test(this.password);
    const containsSymbols = /[^a-zA-Z0-9]/.test(this.password);

    if (containsLetters && containsDigits && containsSymbols) return 'Password strength: Strong';
    if (containsLetters && (containsSymbols || containsDigits)) return 'Password strength: Medium';

    return 'Password strength: Weak';
  }

  onPasswordChange(): void {
  }
}




















