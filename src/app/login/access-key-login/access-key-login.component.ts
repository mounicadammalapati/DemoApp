import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-key-login',
  imports: [],
  templateUrl: './access-key-login.component.html',
  styleUrl: './access-key-login.component.css'
})
export class AccessKeyLoginComponent implements OnInit {

  accessLoginForm:FormGroup;
  accessKeyRegister:FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {

    this.accessLoginForm = this.fb.group({
      accessKey: ['',[Validators.required]]
    });

    this.accessKeyRegister = this.fb.group({
      accessKey: ['',[Validators.required]],
      name: ['']
    });
  }

  ngOnInit(): void {
    this.router.navigate(['/dashboard']);
  }




}
