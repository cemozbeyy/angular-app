import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginError!: any;
  request!: Subscription;
  tryingToLogIn!: boolean;

  constructor(
    public loginValidationBar: MatSnackBarModule,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private toaster :ToastrService
  ) {}

  signinForm = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get validaton() {
    return this.signinForm.controls;
  }

  ngOnInit(): void {
    this.signinForm;
  }
  login() {
    this.tryingToLogIn = true;
    const user = this.signinForm.value;
    if (this.request) {
      this.request.unsubscribe();
    }
    else{
      this.toaster.error("E-mail veya parola hatalı !");
    }
    this.request = this.auth.login(user.email, user.password).subscribe(
      (lUser) => {
        if (lUser) {
          this.loginError = null;
          setTimeout(() => {
            this.toaster.success("Giriş yapıldı !");
            this.router.navigate(["/", "dashboard"]);
          }, 2000);
        } else {
          this.toaster.error("E-mail veya parola hatalı !");
        }
      },
      //Error handling
      // (_err) => {
      //   this.loginError =
      //     'An error occoured during login, see error in console';
      //   this.tryingToLogIn = false;
      // },
      // //Observable Done
      // () => {
      //   this.tryingToLogIn = false;
      // }
    );
    
  }
}
