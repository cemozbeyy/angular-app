import { UserService } from './../user.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../user';
import { Observable } from 'rxjs';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }
    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private toaster: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
  ) {}
  users!: Observable<User[]>;

  password!: string;
  rePassword!: string ;

  creatingUser: boolean = true;
  user!: User;
  error!: any;
  registerForm = this.fb.group(
    {
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      rePassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    [
      {
        validator: MustMatch('password', 'rePassword'),
      },
    ]
  );
  

  get validaton() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {}
  createUser(user: User) {
    this.userService.createUser(user)
    this.toaster.success("Başarıyla kayıt oldunuz !");
  }
  onSubmit() {
    this.registerForm.value
      if (this.registerForm.valid) {
        this.createUser(this.registerForm.value)
        setTimeout(() => {
          this.toaster.success("Başarıyla kayıt oldunuz !");
          this.router.navigate(["/", "signin"]);
        }, 2000);
      }
      else{
        this.toaster.error("Bir hata oluştu");
      }
  }
}
