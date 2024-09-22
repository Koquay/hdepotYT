import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs';
import { StoreTopPickProducts } from './product.actions';
import { StoreProducts } from './product-sidebar/product-sidebar.actions';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = "/api/product";

  constructor(
    private httpClient:HttpClient,
    private store:Store,
    private toastr:ToastrService
  ) { }

  public getTopPicks = (type:string) => {
    console.log('ProductService.getTopPicks', type)

    const params = new HttpParams({
      fromObject: { type },
    });

    this.httpClient
      .get(this.url + '/tabs', { params: params })
      .pipe(
        tap((products) => {
          console.log('products', products);
          this.store.dispatch(StoreTopPickProducts({ products }));
        }),
        catchError(error => {
          console.log('error', error)
          this.toastr.error('Problem getting top picks', 'Get Top Picks')
          throw error;
        }) 
      )
      .subscribe();

  }

  public getProducts = (productsSidebar) => {
    const sidebarFilters = this.createFilterParams(productsSidebar);

    const params = new HttpParams({
      fromObject: { sidebarFilters: sidebarFilters },
    });

    this.httpClient
      .get<{ products; productCount }>(this.url, { params: params })
      .pipe(
        tap((productData) => {
          console.log('productData', productData);
          this.store.dispatch(StoreProducts({ productData }));
        }),
        catchError(error => {
          console.log('error', error)
          this.toastr.error('Problem getting products', 'Get Products')
          throw error;
        }) 
      )
      .subscribe();
  };

  private createFilterParams(productsSidebar) {
    console.log('ProductService.productsSidebar', productsSidebar);
    const brandFilters = productsSidebar.brands.brands.filter(
      (filter) => filter.checked
    );
    console.log('ProductService.brandFilters', brandFilters);

    const brands = [];

    for (let brand of brandFilters) {
      brands.push(brand.name);
    }

    const priceFilters = productsSidebar.priceFilter.priceRange.filter(
      (filter) => filter.checked
    );
    const priceRanges = [];
    for (let priceRange of priceFilters) {
      priceRanges.push(priceRange.range);
    }

 
    const ratingFilters = productsSidebar.ratings.ratings.filter(
      (filter) => filter.checked
    );
    console.log('ProductService.ratingFilters', ratingFilters);

    const ratings = [];

    for (let rating of ratingFilters) {
      ratings.push(rating.rating);
    }

    // let sortFilter = productsSidebar.sortFilters.filters.filter(
    //   (filter) => filter.checked == true
    // );

    const filters = {
      brands: brands,
      priceRanges: priceRanges,
      ratings: ratings,
      // sortFilter: sortFilter[0],
      pageNo: productsSidebar.pageNo,
      pageSize: productsSidebar.pageSize,
    };

    console.log('filters', filters);
    return JSON.stringify(filters);
  }
}
