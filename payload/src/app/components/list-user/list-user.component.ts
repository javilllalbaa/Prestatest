import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { modelUser } from './../../shared/models/modelUser'



@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  allUser = [];

  constructor(
    private fb: FormBuilder,
    public http: HttpClient,
    private route: Router
  ) { }

  ngOnInit() {
    this.listUser()
  }

  listUser(){
    this.http.get('http://localhost:3000/client').subscribe(
      (data) => { // Success
        if(data instanceof Array){
          data.map(p => {
            this.allUser.push( new modelUser(p.id, p.name, p.cedula, p.email, p.status )) 
            console.log(this.allUser)
          })
        }
      },
      (error) =>{
        console.error(error);
      }
    );
  }

}
