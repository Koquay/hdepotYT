import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public user;

  constructor(
    private store:Store<{userReducer}>
  ){}

  ngOnInit() {
    this.subscribeToRedux();        
  }

  private subscribeToRedux = () => {
    const userReducer$ = this.store.select((state) => {
      return state.userReducer;
    });

    userReducer$.subscribe((userReducer:any) => {
      this.user = userReducer?.user;
      console.log('userComponent.user', this.user)
    });
  }


}
