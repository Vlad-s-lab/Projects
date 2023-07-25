import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const weakPasswords = [
  '11111111111',
  'password',
  '123456789',
  'qwerty',

];


const commonlyUsedPasswords = [
  'password1',
  'qwerty123',
  '12345678',

];
@Component({
  selector: 'app-password-strength-control',
  template: `
    <div class="container">
      <label class="password-text" for="password">Enter Password:</label>
      <div class="password-input-container">
        <input class="password-area" type="{{ showPassword ? 'text' : 'password' }}" id="password" [value]="password"
               (input)="onPasswordChange($event)"/>
        <span class="password-toggle-icon" (click)="togglePasswordVisibility()">
      <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
    </span>
        <div class="custom-tooltip">
          Create a strong password with a mix of letters, numbers, and symbols.
        </div>
      </div>
      <div class="strength-indicator">
        <div class="section" [ngStyle]="{ backgroundColor: passwordStrengthColor }"></div>
        <div class="section"
             [ngStyle]="{ backgroundColor: passwordStrengthColor === 'green' ? 'green' : passwordStrengthColor === 'yellow' ? 'yellow' : 'gray' }"></div>
        <div class="section"
             [ngStyle]="{ backgroundColor: passwordStrengthColor === 'green' ? 'green' : 'gray' }"></div>
      </div>

      <p>Password strength: {{ passwordStrengthText }}</p>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 0;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .password-text {
        font-weight: bold;
        margin: 0 0 10px;
      }


      .password-area {
        width: 250px;
        padding: 5px;
        font-size: 16px;
        border: 2px solid #ccc;
        border-radius: 5px;
        outline: none;
      }
      .password-input-container {
        position: relative;
      }

      .password-toggle-icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        cursor: pointer;
      }

      .strength-indicator {
        display: flex;
        justify-content: space-between;
        margin: 15px 0 0 0;
      }

      .section {
        width: 30px;
        height: 10px;
        margin: 0 2px;
        border: 1px solid #aaa;
      }

      .custom-tooltip {
        position: absolute;
        top: -63px;
        left: 98%;
        width: 200px;
        background-color: #333;
        color: #fff;
        font-size: 14px;
        padding: 8px;
        border-radius: 4px;
        display: none;
      }

      .password-input-container:hover .custom-tooltip {
        display: block;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordStrengthControlComponent),
      multi: true,
    },
  ],
})
export class PasswordStrengthControlComponent implements ControlValueAccessor {
  password: string = '';
  passwordStrengthColor: string = 'gray';
  passwordStrengthText: string = '';
  showPassword: boolean = false;

  onPasswordChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.value !== undefined) {
      this.password = target.value.trim();
      this.checkForWeakPassword();
      this.checkForCommonlyUsedPassword();
      this.calculatePasswordStrength();
      this.onChange(this.password);
      this.onTouched();
    }
  }

  checkForWeakPassword(): void {
    const lowerCasePassword = this.password.toLowerCase();
    if (weakPasswords.includes(lowerCasePassword)) {
      this.passwordStrengthColor = 'red';
      this.passwordStrengthText = 'Weak (Common Password)';
    }
  }

  checkForCommonlyUsedPassword(): void {
    const lowerCasePassword = this.password.toLowerCase();
    if (commonlyUsedPasswords.includes(lowerCasePassword)) {
      this.passwordStrengthColor = 'red';
      this.passwordStrengthText = 'Weak (Commonly Used Password)';
    }
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  calculatePasswordStrength(): void {
    const containsLetters = /[a-zA-Z]/.test(this.password);
    const containsDigits = /\d/.test(this.password);
    const containsSymbols = /[^a-zA-Z0-9]/.test(this.password);

    if (this.password.length === 0) {
      this.passwordStrengthColor = 'gray';
      this.passwordStrengthText = '';
    } else if (this.password.length < 8) {
      this.passwordStrengthColor = 'red';
      this.passwordStrengthText = 'Invalid';
    } else if (containsLetters && containsDigits && containsSymbols) {
      this.passwordStrengthColor = 'green';
      this.passwordStrengthText = 'Strong';
    } else if (containsLetters && (containsSymbols || containsDigits)) {
      this.passwordStrengthColor = 'yellow';
      this.passwordStrengthText = 'Medium';
    } else {
      this.passwordStrengthColor = 'red';
      this.passwordStrengthText = 'Weak';
    }
  }

  private onChange: Function = () => {
  };
  private onTouched: Function = () => {
  };

  writeValue(value: string): void {
    this.password = value || '';
    this.calculatePasswordStrength();
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}
