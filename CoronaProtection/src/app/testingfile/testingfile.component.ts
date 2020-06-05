import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { Router } from '../../../node_modules/@angular/router';
import { AuthService } from '../auth.service';
import { HttpEvent, HttpEventType } from '../../../node_modules/@angular/common/http';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-testingfile',
  templateUrl: './testingfile.component.html',
  styleUrls: ['./testingfile.component.css']
})
export class TestingfileComponent implements OnInit {
  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  users = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: CartService
  ) {
    // Reactive Form
    this.form = this.fb.group({
      name: [''],
      avatar: [null],
      price: [null]
    })
  }

  ngOnInit() { }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append("name", this.form.value.name);
    formData.append("avatar", this.form.value.avatar); 
    formData.append("price", this.form.value.price);
    this.fileUploadService.addProduct(formData)
    .subscribe(res=> {
      alert(res.message)
      alert(JSON.stringify(res))
      this.router.navigate(['items'])
    },
    err=> console.log(err)
  )
  }

}
