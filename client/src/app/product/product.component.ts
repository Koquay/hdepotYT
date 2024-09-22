import { Component } from '@angular/core';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';
import { Store } from '@ngrx/store';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';
import { ShortenTextPipe } from '../shared/pipes/shorten-text.pipe';
import { CreateRatingStarsDirective } from '../shared/directives/create-rating-stars.directive';
import { RouterModule } from '@angular/router';
import { DiscountPricePipe } from '../shared/pipes/discount-price.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductSidebarComponent,
    ShortenTextPipe,
    CreateRatingStarsDirective,
    DiscountPricePipe
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  public products;
  public productCount;
  public productSidebar;
  public numberOfPages;
  public pages = [];

  constructor(
    private store:Store<{productSidebarReducer, productReducer}>,
    private productService:ProductService
  ){}

  ngOnInit() {
    this.subscribeToRedux();        
  }

  private subscribeToRedux = () => {
    const productSidebarReducer$ = this.store.select((state) => {
      return state.productSidebarReducer;
    });

    productSidebarReducer$.subscribe((productSidebarReducer:any) => {
      this.productSidebar = productSidebarReducer.productSidebar;
      this.productService.getProducts(productSidebarReducer.productSidebar)
    });

    const productReducer$ = this.store.select((state) => {
      return state.productReducer;
    });

    productReducer$.subscribe((productReducer) => {
      console.log('ProductComponent.productReducer', productReducer);
      this.products = productReducer.products;
      this.productCount = productReducer.productCount;
      this.numberOfPages = Math.ceil(
        this.productCount / this.productSidebar.pageSize
      );
      this.pages = [];
      for (let i = 1; i <= this.numberOfPages; i++) {
        this.pages.push(i);
      }
    });
  }

  public getPage(pageNo) {
    this.productSidebar.pageNo = pageNo;
    this.getProducts();
  }

  public getPageByDirection(direction) {
    if (direction === '»') {
      if (this.productSidebar.pageNo < this.numberOfPages) {
        ++this.productSidebar.pageNo;
        this.getProducts();
      }
    } else if (direction === '«') {
      if (this.productSidebar.pageNo > 1) {
        --this.productSidebar.pageNo;
        this.getProducts();
      }
    }
  }

  private getProducts = () => {
    this.productService.getProducts(this.productSidebar);
  };
}
