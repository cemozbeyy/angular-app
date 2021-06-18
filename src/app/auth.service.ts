import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private af: AngularFireAuth) {}
  $users: Observable<User[]> = new Observable();
  login(email: any, password: string): Observable<any> {
    let promise = <Promise<any>>(
      this.af.signInWithEmailAndPassword(email, password)
    );
    return from(promise); //Verileri eşzamansız olarak dönüştürmenize ve vaatlerle yapamayacağınız veya yapmanın çok zor olacağı görevleri gerçekleştirmenize izin veren bir grup operatörünüz olduğunu unutmayın. Rxjs, tüm güçlerini eşzamansız veri dizileri ile ortaya çıkarır (sıra, yani 1'den fazla eşzamansız değer).
  }

  currentUser(user:User) {
    return from(this.af.currentUser).pipe(
      switchMap((
         authState: any //switchMap operatörü, her değeri bir observable ile eşler, ardından tüm iç observablelar ile düzleştirir. Temel olarak her bir kaynak değerini bir observable yansıtır ve daha sonra observable çıktıda birleştirilir, yalnızca en son öngörülen gözlenebilirden değerler yayar
      ) => (authState ? authState : of(null)))
    );
  }

  logout(): Observable<void> {
    let promise = this.af.signOut();
    return from(promise);
  }
}
