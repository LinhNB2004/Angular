import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../interfaces/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss',
})
export class ProductUpdateComponent implements OnInit {
  product: Product = {} as Product;
  productForm: FormGroup = {} as FormGroup;

  // khởi tạo (constructor)
  constructor(
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute // Lấy dl cũ
  ) {
    this.productForm = this.fb.group({
      thumbnail: ['', [Validators.required, Validators.minLength(3)]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.productService.getProductById(id).subscribe((product) => {
        this.product = product;
        this.productForm.patchValue(this.product);
      });
    }
  }

  handleSubmit() {
    // Kiểm tra tính hợp lệ của form
    if (this.productForm.valid) {
      // valid: Thành công
      // Cập nhật sản phẩm
      const updatedProduct: Product = {
        ...this.product,
        ...this.productForm.value,
      };
      console.log(this.productForm.value);
      this.productService.updateProduct(updatedProduct).subscribe((data) => {
        console.log('Update thành công', data);
        alert('Update thành công');
        this.router.navigate(['/admin']);
      });
    }
  }
}
