import { Component, Input } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ShortenTextPipe } from '../../shared/pipes/shorten-text.pipe';
import { CreateRatingStarsDirective } from '../../shared/directives/create-rating-stars.directive';
import { DiscountPricePipe } from '../../shared/pipes/discount-price.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-pick-data',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    ShortenTextPipe,
    CreateRatingStarsDirective,
    DiscountPricePipe
  ],
  templateUrl: './top-pick-data.component.html',
  styleUrl: './top-pick-data.component.scss'
})
export class TopPickDataComponent {
  public topPickProducts:any;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 4,
      }
    }
  }

  @Input() 
  set topPickType(topPickType: string) {
    this.getTopPicks(topPickType)
  }

  constructor(
    private store: Store<{ productReducer:any}>,
    private productService:ProductService
  ){}

  ngOnInit() {
    this.subscribeToRedux();    
  }

  private subscribeToRedux = () => {
    const productReducer$ = this.store.select((state) => {
      return state.productReducer;
    });

    productReducer$.subscribe((productReducer:any) => {
      this.topPickProducts = productReducer?.topPickProducts;
      console.log('TopPickDataComponent.topPickProducts', this.topPickProducts)
    });
  }

  public getTopPicks = (type:string) => {
    console.log('TopPickDataComponent.getTopPicks', type)
    this.productService.getTopPicks(type);
  }
}
