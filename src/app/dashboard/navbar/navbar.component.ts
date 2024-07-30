import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showProfileMenu = false;

  // Inject Router service in the constructor
  constructor(private router: Router) { }

  onProfileClick() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  onLogoutClick() {
    alert('Logout button clicked');
  }

  onViewUsersClick() {
    console.log('View Users Clicked');
  }
  
  onLoginClick() {
    this.router.navigate(['/login']); // Use the router to navigate
  }

  onRegisterClick() {
    this.router.navigate(['/register']); // Use the router to navigate
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

}
