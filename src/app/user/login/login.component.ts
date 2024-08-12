import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/services/models';
import { UserControllerService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: UserControllerService,
    private tokenService : TokenService
  ){}
  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res): void => {
        // Save the token and role
        this.tokenService.token = res.token as string;
        this.tokenService.role = res.role as string;
  
        // Redirect based on role
        if (this.tokenService.role === 'ADMIN') {
          alert('Login successful! Redirecting to dashboard...');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login successful! Redirecting to home...');
          this.router.navigate(['/home']);
        }
      },
      error: (err): void => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.validationErrors);
        }
      }
    });
  }
    register() {
      this.router.navigate(['register']);
      }
}
