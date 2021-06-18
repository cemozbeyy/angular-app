import { AuthService } from './../auth.service';
import { ModalComponent } from './../modal/modal.component';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  _user!: User;
  // getUsarname!:any;
  $users: Observable<User[]> = new Observable();
  items = [];
  pageOfItems!: Array<any>;
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private toaster: ToastrService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    // this.getUsarname = localStorage.getItem('name');
    this.$users = this.userService.getUsers;
    console.log(this.$users = this.userService.getUsers);
    this.currentUser = await this.authService.currentUser(this._user).toPromise();
    console.log(this.currentUser)
  }

  openModal(user:User) {
    this._user = user;
    const dialogRef = this.dialog.open(ModalComponent,{ data:user } );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
