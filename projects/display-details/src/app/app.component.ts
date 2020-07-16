import { Component, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  @Input() employeeData: any;
  
  constructor() {
      const el = document.querySelector('enrollment-form');
      el.addEventListener('submittedData', (event: CustomEvent)=> {this.setEmployeeData(JSON.parse(event.detail.detail.enrollmentData))})
      // el.addEventListener('submittedData', function(event: CustomEvent){this.setEmployeeData(JSON.parse(event.detail.detail.enrollmentData))})
    }

  ngOnInit(){
  }

  setEmployeeData(data: any){
    this.employeeData = data;
    return; 
  }
  
}
