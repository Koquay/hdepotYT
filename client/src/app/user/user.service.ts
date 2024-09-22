import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs';
import { StoreUser } from './user.actionls';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = '/api/user';

  constructor(
    private httpClient:HttpClient,
    private store:Store,
    private toastr: ToastrService,
  ) { }

  public signUp = (user) => {
    return this.httpClient.post(this.url, {user}).pipe(
      tap(userData => {
        console.log('userData: ', userData)
        this.store.dispatch(StoreUser({user: userData}))
        this.toastr.success('Signup successful', 'Sign Up')
      }),
      catchError(error => {
        console.log('error', error)
        this.toastr.error('Problem signing up user', 'Sign In')
        throw error;
      })    
    )
  }

  public signIn = (user) => {
    return this.httpClient.put(this.url, {user}).pipe(
      tap(userData => {
        console.log('userData: ', userData)
        this.store.dispatch(StoreUser({user: userData}))
        this.toastr.success('Signin successful', 'Sign In')
      }),
      catchError(error => {
        console.log('error', error)
        this.toastr.error('Problem signing in', 'Sign In')
        throw error;
      })    
    )
  }
}
