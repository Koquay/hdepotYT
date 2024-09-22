import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TopPickDataComponent } from '../top-pick-data/top-pick-data.component';

@Component({
  selector: 'app-top-picks',
  standalone: true,
  imports: [
    CommonModule,
    TopPickDataComponent
  ],
  templateUrl: './top-picks.component.html',
  styleUrl: './top-picks.component.scss'
})
export class TopPicksComponent {
  public topPickTabs:any;
  public topPickType:any;

  constructor(
    private store: Store<{ homeReducer:any; }>
  ){}

  ngOnInit() {
    this.topPickType = 'All'
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {
    const homeReducer$ = this.store.select((state) => {
      return state.homeReducer;
    });

    homeReducer$.subscribe((homeReducer:any) => {
      this.topPickTabs = homeReducer.topPickTabs;
    });
  }

  public setTopPickType = (type:string) => {
    this.topPickType = type;
  }  

}
