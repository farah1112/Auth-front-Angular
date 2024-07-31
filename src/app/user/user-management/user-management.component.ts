import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isEditing = false;

  newUser: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    enabled: false,
    roles: []
  };

  currentUser: User = { ...this.newUser };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser(): void {
    this.userService.register(this.currentUser).subscribe(() => {
      this.loadUsers();
      this.resetForm();
    });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
    this.currentUser = { ...user };
    this.isEditing = true;
  }

  updateUser(): void {
    if (this.selectedUser && this.selectedUser.id !== undefined) {
      this.userService.updateUser(this.selectedUser.id, this.currentUser).subscribe(() => {
        this.loadUsers();
        this.resetForm();
      });
    }
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  resetForm(): void {
    this.newUser = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      enabled: false,
      roles: []
    };
    this.currentUser = { ...this.newUser };
    this.selectedUser = null;
    this.isEditing = false;
  }
}
