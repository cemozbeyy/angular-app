import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userInfo } from 'os';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user!: User;
  $users: Observable<User[]> = new Observable();
  items = [];
  pageOfItems!: Array<any>;
  constructor(
    private userService: UserService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.$users = this.userService.getUsers;
  }
  updateUser(user: User) {
    if (user) {
      this.userService.updateUser(user);
      this.toaster.success('Kullanıcı güncellendi');
    }
    else{
      this.toaster.error('Kullanıcı güncellendi');
    }
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(
      (user) => {
        this.toaster.success('Kullanıcı başarıyla silindi !');
      },
      (_err) => {
        this.toaster.success('Kullanıcı silinemedi !');
      }
    );
  }
}
