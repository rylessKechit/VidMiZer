import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpRequestService } from "../shared/http-request.service";
import { ClientInfos } from '../shared/client-infos';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})

export class ClientFormComponent implements OnInit {


  regions: any = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phoneNumber', 'region'];
  dataSource: any = [
    {firstName: 'Ryless', lastName: 'Kechit', email: 'ryless.kechit@outlook.com', region: 'Guadeloupe', phoneNumber: '0641903254'},
    {firstName: 'Hamid', lastName: 'Dubois', email: 'hamid@dubois.com', region: 'ile-de-france', phoneNumber: '1234567890'},
  ];

  constructor(
    public httpRequest: HttpRequestService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) { }

  clientForm: any; // Form fields

  ngOnInit(): void {
    this.loadRegions()
    this.clientForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*')]),
      email: new FormControl(null, [Validators.email]),
      region: new FormControl('Guadeloupe'),
      phoneNumber: new FormControl(null, [Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(10)]),
    })
  }

  // Get regions list
  loadRegions() {
    return this.httpRequest.getRegions().subscribe((data: {}) => {
      this.regions = data;
      console.log(this.regions);
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

  // Get data from Form
  submitData() {
    const isValid = this.dataSource.some((e: any) => {
      e.firstName === this.clientForm.firstName ||
      e.lastName === this.clientForm.lastName ||
      e.phoneNumber === this.clientForm.phoneNumber
    })
    !isValid && this.dataSource.push(this.clientForm.value);
    this.changeDetectorRefs.detectChanges()
    console.log(this.clientForm.value);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
