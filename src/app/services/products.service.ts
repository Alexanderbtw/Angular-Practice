import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import { IProduct } from "../models/product";
import { Observable, catchError, delay, retry, tap, throwError } from "rxjs";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  products: IProduct[] = [];

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products',
      {params: new HttpParams({
        fromObject: {limit: 5}
      })
    }).pipe(
      delay(500),
      retry(2),
      tap(products => this.products = products),
      catchError(this.ErrorHandler.bind(this))
    );
  }

  Create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('https://fakestoreapi.com/products', product).pipe(
      tap(products => this.products.push(products))
    );
  }

  private ErrorHandler(error: HttpErrorResponse) {
    this.errorService.Handle(error.message);
    return throwError(() => error.message);
  }
}
