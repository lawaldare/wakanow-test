import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private emailAddress = new BehaviorSubject<string>("");
  emailAddress$ = this.emailAddress.asObservable();

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }


  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(this.auth.signOut())
  }

  setEmailAddress(email: string) {
    this.emailAddress.next(email);
  }

  setLoginState(state: boolean) {
    this.isLoggedIn.next(state);
  }
}
