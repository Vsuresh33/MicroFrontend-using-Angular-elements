import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'enrollment-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  employeeData:any = null;

  enrollform = new FormGroup({
    eid: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
  });

  @Output() submittedData = new EventEmitter<any>();

  constructor() { 
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    let enrollmentData = JSON.stringify(this.enrollform.value);
    console.log(enrollmentData);
    let event = new CustomEvent("submittedData", {"detail":{"enrollmentData": enrollmentData}});
    this.submittedData.emit(event);
    window.sessionStorage.setItem('employeeData', enrollmentData);
    return;
  }

}
