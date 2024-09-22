import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { restoreStateFromLocalStorage } from './app.actions';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private store:Store
) { }

public restoreStateFromLocalStorage = () => {
  const hdepot = JSON.parse(localStorage.getItem("hdepot"));
    this.store.dispatch(restoreStateFromLocalStorage({hdepot})); 
}
}
