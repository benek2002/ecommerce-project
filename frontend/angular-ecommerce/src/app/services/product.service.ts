import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  


  private baseUrl:string = environment['shopApiUrl'] + '/products';

  private categoryUrl:string = environment['shopApiUrl'] + '/product-category';

  constructor(private HttpClient: HttpClient) { }

  getProductList(categoryId: number): Observable<Product[]>{
    const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProdcuts(searchUrl);

    }

    getProductListPaginate(thePage: number, 
                          thePageSize: number,
                          categoryId: number): Observable<GetResponseProducts>{
      const searchUrl= `${this.baseUrl}/search/findByCategoryId?id=${categoryId}` + `&page=${thePage}&size=${thePageSize}`;
  
      return this.HttpClient.get<GetResponseProducts>(searchUrl);
  
      }
  

  getProductCategories(): Observable<ProductCategory[]> {

    return this.HttpClient.get<GetResponseProductCategory>(
      this.categoryUrl).pipe(map(response => response._embedded.productCategory));
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl= `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProdcuts(searchUrl);

  }

  searchProductsPaginate(thePage: number, 
    thePageSize: number,
    keyword: string): Observable<GetResponseProducts>{
const searchUrl= `${this.baseUrl}/search/findByNameContaining?name=${keyword}` + `&page=${thePage}&size=${thePageSize}` ;

return this.HttpClient.get<GetResponseProducts>(searchUrl);

}


  private getProdcuts(searchUrl: string): Observable<Product[]> {
    return this.HttpClient.get<GetResponseProducts>(
      searchUrl).pipe(map(response => response._embedded.products));
  }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl: string=`${this.baseUrl}/${theProductId}`;
    return this.HttpClient.get<Product>(productUrl);
  }

}

interface GetResponseProducts{
  _embedded: {
    products: Product[];
  },
  page: {
    size:number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

  interface GetResponseProductCategory{
    _embedded: {
      productCategory: ProductCategory[];
    }
}
