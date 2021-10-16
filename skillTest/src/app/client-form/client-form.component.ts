import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  constructor() { }

  clientForm: any; // Form fields

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      email: new FormControl(null, [Validators.email]),
      phoneNumber: new FormControl(null, [Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]),
    })
  }

  get firstName() {
    return this.clientForm.get('firstName');
  }
  get lastName() {
    return this.clientForm.get('lastName');
  }
  get email() {
    return this.clientForm.get('email');
  }
  get phoneNumber() {
    return this.clientForm.get('phoneNumber');
  }

  submitData() {
    console.log(this.clientForm.value);
  }

}
