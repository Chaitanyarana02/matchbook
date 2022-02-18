import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { catchError, filter, Observable, tap, throwError } from 'rxjs';
import { Product } from './entities/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient ) { }

  getProducts(): Observable<Product[]>{
    const apiUrl =  '/assets/company.json';
    return this.http.get<any>(apiUrl, {}).pipe(
      tap((data) => data),
      catchError(this.handleError(this))
    );
  }

  getProviders(Id:string):Observable<Provider[]>{
    const apiUrl =  '/assets/provider.json';
    return this.http.get<any>(apiUrl, {}).pipe(
      tap((data) => {console.log(data)}),
      // filter((data)=> data.Id === Id),
      catchError(this.handleError(this))
    );
  }

  handleError(error: any): any {
    return throwError(error);
  }
}
