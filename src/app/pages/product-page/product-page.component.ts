import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  title = 'demo';
  // products: IProduct[] = [];
  loading = false;
  // products$: Observable<IProduct[]>;
  term: string = "";

  constructor(public productsService: ProductService, public modalService: ModalService) {}

  ngOnInit(): void {
    this.loading = true;
    // this.products$ = this.productsService.getAll().pipe(
    //   tap(() => this.loading = false)
    // );
    this.productsService.getAll().subscribe(() => {
      this.loading = false;
    });
  }
}
