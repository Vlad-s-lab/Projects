import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PasswordStrengthControlComponent } from './password-strength-control/password-strength-control.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [AppComponent, PasswordStrengthControlComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

