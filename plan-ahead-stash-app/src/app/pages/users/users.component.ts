import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: User[] = [];

  constructor(private userService: UserService) {
    this.loadData();
  }


  loadData() {
    this.userService.findAll().subscribe({
      next: (data) => {
        console.log("users", data);
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
