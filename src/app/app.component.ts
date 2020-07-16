import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  config = {
    "enrollment-form": {
      loaded: false,
      path: 'enrollment-form/main.js',
      element: 'enrollment-form'
    },
    "display-details": {
      loaded: false,
      path: 'display-details/main.js',
      element: 'display-details'
    },
    
  };

  ngOnInit() {
    this.load('enrollment-form');
    this.load('display-details');
  }

  load(name: string): void {

    const configItem = this.config[name];
    if (configItem.loaded) return;

    const content = document.getElementById(name);

    const script = document.createElement('script');
    script.src = configItem.path;
    content.appendChild(script);
    
    const element: HTMLElement = document.createElement(configItem.element);
    content.appendChild(element);

    script.onerror = () => console.error(`error loading ${configItem.path}`);

  }
}
