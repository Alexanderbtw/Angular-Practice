import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(private productService: ProductService, private modalService: ModalService) {}

  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    price: new FormControl<number>(0, [Validators.required, Validators.pattern("\\d*(\\.\\d\\d?)?")])
  });

  get form_info() {
    return [this.form.controls.title, this.form.controls.price] as FormControl[];
  }

  ngOnInit(): void { }

  Submit() {
    this.productService.Create({
      title: this.form.value.title as string,
      price: this.form.value.price as number,
      description: "None",
      image: 'https://i.pravatar.cc',
      category: 'None',
      rating: {
        rate: 0,
        count: 0
      }
    }).subscribe(() => {
      this.modalService.Close();
    });
  }
}
