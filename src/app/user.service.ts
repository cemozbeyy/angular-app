import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { User } from './user';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import * as admin from 'firebase-admin';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AnyARecord } from 'dns';

const USER_COLLECTION = 'users';


@Injectable()
export class UserService {
  app: any;
  updatedUserData: any;

  currentUserId!:string;

  constructor(
    private afFireStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afModule: AngularFireModule,
  ) {}

  get getUsers() {
    return this.afFireStore.collection<User>(USER_COLLECTION, query => query.orderBy('profile'))
      .snapshotChanges()
      .pipe(
        map(o => o.map(doc => ({ id: doc.payload.doc.id, ...doc.payload.doc.data() } as User)))
      );
  }

  getUser(uid: string) {
    return this.afFireStore.collection<User>(USER_COLLECTION).doc(uid).ref.get();
  }

  get currentUser() {
    return <User>JSON.parse(localStorage.getItem("user") || "")
  }

  get isAdmin() {
    return this.currentUser.role === 1;
  }

  updateUser(user: User) {
    return this.afFireStore.collection(USER_COLLECTION).doc(user.id).update(user);
  }
  createUser(user: User) {
    this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((fbAuth) => {
        this.afFireStore
          .collection('users')
          .doc(fbAuth.user?.uid)
          .set({
            profile: {
              email: user.email,
              name: user.name,
              surname: user.surname,
              password: user.password,
              rePassword: user.rePassword,
            },
          });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  deleteUser(user: User): Observable<any[]> {
    let dataToDelete: any = {};
    if (user !== undefined &&  user.id !== undefined) {
      this.afFireStore.collection(USER_COLLECTION).doc(user.id).delete()
    }
    return of(dataToDelete);
  }
}
