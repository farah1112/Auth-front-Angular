import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showProfileMenu = false;

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
    this.router.navigate(['/login']); 
  }

  onRegisterClick() {
    this.router.navigate(['/register']); 
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }
  onAddEventClick(): void {
    this.router.navigate(['/events']); 
  }

}
