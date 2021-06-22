import { AuthService } from './../auth.service';
import { ModalComponent } from './../modal/modal.component';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";

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
  logoutSub!:Subscription;
  isAdmin = this.userService.isAdmin;

  constructor(
    private aService:AuthService,
    public dialog: MatDialog,
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // this.getUsarname = localStorage.getItem('name');
    this.$users = this.userService.getUsers;
    
  }

  logout(){
    this.logoutSub = this.aService.logout().subscribe(() => {
      this.router.navigate(['/signin']).then(() => {
        this.toaster.success("Çıkış yapıldı")
      });
    });
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
