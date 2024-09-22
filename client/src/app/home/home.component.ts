import { Component } from '@angular/core';
import { HeroCarouselComponent } from './hero-carousel/hero-carousel.component';
import { TopPicksComponent } from './top-picks/top-picks.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroCarouselComponent,
    TopPicksComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
