import { UserService } from './user.service';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(
    private af: AngularFireAuth,
    private userService:UserService
    ) {}
  $users: Observable<User[]> = new Observable();
  login(email: any, password: string): Observable<any> {
    let promise = <Promise<any>>(
      this.af.signInWithEmailAndPassword(email, password)
    );
    return from(promise); //Verileri eşzamansız olarak dönüştürmenize ve vaatlerle yapamayacağınız veya yapmanın çok zor olacağı görevleri gerçekleştirmenize izin veren bir grup operatörünüz olduğunu unutmayın. Rxjs, tüm güçlerini eşzamansız veri dizileri ile ortaya çıkarır (sıra, yani 1'den fazla eşzamansız değer).
  }

  // currentUser() : Observable<any>{
  //   return this.af.currentUser =this.userService.getUser(this.af.uid) :
      
  // }

  logout(): Observable<void> {
    let promise = this.af.signOut();
    return from(promise);
  }
}
