import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/Product';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
})
export class ProductAddComponent implements OnInit {
  product: Product = {} as Product
  productForm: FormGroup = {} as FormGroup;

  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit(): void {}
  handleSubmit() {
    this.productService.createProduct(this.product).subscribe((product) => {
      console.log('Success!', product);
      // chuyen huong trang
      this.router.navigate(['/admin']);
    });
  }
}