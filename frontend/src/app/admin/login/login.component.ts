import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CardShellComponent } from '../../common/card-shell/card-shell.component';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    CardShellComponent,
    CardShellComponent,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginData = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  errors = false;

  login(event: SubmitEvent) {
    const { email, password } = this.loginData.getRawValue();
    if (!email || !password) {
      return;
    }
    if (!checkLogin(email, password)) {
      this.errors = true;
      return;
    }
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    window.location.reload();
  }
}

function checkLogin(username: string, password: string) {
  return username === 'admin@admin.com' && password === 'admin';
}
