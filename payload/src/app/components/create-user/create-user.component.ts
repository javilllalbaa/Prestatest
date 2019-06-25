import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    cedula: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required])
  });

  constructor(
    private fb: FormBuilder,
    public http: HttpClient,
    private route: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log("Test");
    console.log("Status...", this.form.value)
    this.form.value.status = true
    console.log("test...", this.form.value.status)
    this.http.get('http://localhost:3000/client').subscribe(
      (data) => { // Success
        console.log("test....", data)
        this.form.value.id = data[0].length + 1
        this.http.post('http://localhost:3000/client', this.form.value).subscribe(
          (data) => { // Success 
              console.log("data...", data)
          },
          (error) =>{
            console.error(error);
          }
        );
      },
      (error) =>{
        console.error(error);
      }
    );
  }

}
