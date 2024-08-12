import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user/model/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  selectedUser: User = {
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    enabled: false,
    roles: []
  };

  @ViewChild('editUserModal') editUserModal!: TemplateRef<any>;
  @ViewChild('consultUserModal') consultUserModal!: TemplateRef<any>;

  constructor(private userService: UserService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Fetched users:', this.users); // Add this line
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users. Check console for details.');
      }
    });
  }
  
  consultUser(user: User) {
    this.selectedUser = { ...user };
    this.modalService.open(this.consultUserModal);
  }

  editUser(user: User) {
    this.selectedUser = { ...user }; // Store the selected user to edit
    this.modalService.open(this.editUserModal); // Open the edit modal
  }
  
  updateUser() {
    if (this.selectedUser.userId) {
      this.userService.updateUser(this.selectedUser.userId, this.selectedUser).subscribe({
        next: (response) => {
          console.log('User updated successfully:', response);
          this.fetchUsers(); // Refresh the user list after update
          this.modalService.dismissAll(); // Close the modal after saving changes
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    } else {
      console.error('User ID is missing');
    }
  }
  

  deleteUser(userId: number) {
    console.log('Attempting to delete user with ID:', userId);
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        console.log('User deleted successfully');
        this.fetchUsers(); // Refresh the user list
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Check console for details.');
      }
    });
  }

  getUserRoles(roles: any[]): string {
    return roles.join(', ');
  }
}
