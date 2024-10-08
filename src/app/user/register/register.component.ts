import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationRequest } from 'src/app/services/models';
import { UserControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registryRequest: RegistrationRequest = { 
    email: '', 
    password: '', 
    firstname: '', 
    lastname: '', 
    role: 'USER' 
  };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: UserControllerService,

  ){

  }

  login() {
    this.router.navigate(['login']);
    }
   
    register() {
      this.errorMsg = [];
      this.authService.register({ body: this.registryRequest }).subscribe({
        next: () => {
          alert('Registration successful! Redirecting to login page...');
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.error('Registration error:', err); // Log the error for debugging
          this.errorMsg = err.error || ['Registration failed']; // Display a general error message if specific validation errors are not available
        }
      });
    }
    goHome() {
      this.router.navigate(['home']);
    }
    
    
}
