import { UserService } from './../user.service';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../user';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  _user!: User;

  constructor(
    @Inject(MAT_DIALOG_DATA ) private data:any, 
    private userService:UserService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this._user = this.data;
  }
  async updateUser(user: User) {
    if (user) {
      await this.userService.updateUser(user);
      this.toaster.success('Kullanıcı güncellendi');

      user.isDisabledForEdit = true;

      setTimeout(() => {
        delete user.isDisabledForEdit
      }, 4000);

    }
    else{
      this.toaster.error('Kullanıcı güncellendi');
    }
  }

}
