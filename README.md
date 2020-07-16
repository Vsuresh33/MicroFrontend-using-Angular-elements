Reference: https://www.angulararchitects.io/aktuelles/micro-apps-with-web-components-using-angular-elements/
		   https://medium.com/@IMM9O/web-components-with-angular-d0205c9db08f

Why MicroFrontend?

Modern web applications are becoming big and more complex and sometimes managed by different teams. 
Your application might have features developed by different teams and you want to release only certain 
features into production before delivering the entire application. How do you manage different teams, 
different release timelines if you have one repo?
Most of these complex apps live on the client-side which makes it harder to maintain. There are some other 
issues as well with this monolithic big fat application.

What are MicroFrontends?

Micro-frontends are small applications mostly divided by subdomain or functionality working together to deliver a larger application.

Steps 

=> First create main angular app using :- ng new micro-frontend-angular-application.

=> Next generate micro apps inside of angular application using :- ng generate application micro-app.

=> If we want to use web components/ angular elements in our app yhen we need to add npm module using :- npm install @angular/elements.

=> We just need to add the angular component into an entry components array instead bootstrap array. bootstrap array should be empty.
Using entryComponents is necessary because Angular Elements are created dynamically at runtime. Otherwise the compiler would not know about them.

=> Then we have to create a wrapper for your component using createCustomElement and register it as a custom element with the browser
using its customElements.define method.

Please note that it does not bootstrap a traditional Angular component. Hence, the bootstrap array is empty and we need to introduce an 
ngDoBootstrap method intended for manual bootstrapping.

ngDoBootstrap() {
    const appElement = createCustomElement(AppComponent, { injector: this.injector})
    customElements.define('custom-element', appElement);
  }
  
=> When we load web components in an other Angular application, we need to register the CUSTOM_ELEMENTS_SCHEMA in main-app app.module.ts, like

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

bootstrap: [AppComponent],
schemas: [ CUSTOM_ELEMENTS_SCHEMA ]  

=> We also need a polyfill for browsers that don't support Web Components. Hence, I've npm installed @webcomponents/custom-elements and referenced 
it at the end of the polyfills.ts file:

import '@webcomponents/custom-elements/custom-elements.min';

BUILD PROCESS

=> To get one self-contained bundle for our Web Component, we can use the CLI. Unfortunately, it always creates several bundles by default. 
To change this behavior, I'm using my CLI-extension called ngx-build-plus:

	npm i ngx-build-plus --save-dev
	
=> It contains builders that tell the CLI which build steps to perform. To register the builder for getting a self-contained bundle, modify 
your angular.json of every micro app key. Like,

  "architect": {
  "build": {
    "builder": "ngx-build-plus:build",
    [...]
  }
  
=> In addition, I'm using the following npm scripts for building the micro-frontend-application as well as the micro apps:

"scripts": {
    "ng": "ng",
    "start": "live-server dist/micro-frontend-application",
    "build": "npm run build:micro-frontend-application && npm run build:main-app",
    "build:main-app": "npm run build:enrollment-form && npm run build:display-details",
    "build:enrollment-form": "ng build --prod --project enrollment-form --single-bundle true --output-hashing none --vendor-chunk false --output-path dist/micro-frontend-application/enrollment-form",
    "build:display-details": "ng build --prod --project display-details --single-bundle true --output-hashing none --vendor-chunk false --output-path dist/micro-frontend-application/display-details",
    "build:micro-frontend-application": "ng build --project micro-frontend-application",
    "build:main-app:webpack:old-solution": "webpack",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  }  
  
=> Install any server to execute main-app, i used npm i live-server-server.   

=> Execute our app using npm start.

Advantages:

=> Apps are small
=> Apps are independent
=> Apps are easier to understand
=> Apps are easier to test
=> Apps development becomes faster

=> Styling is isolated from other Microservice Clients due to Shadow DOM or the Shadow DOM Emulation provided by Angular out of the box.
=> Allows for separate development and separate deployment.
=> We can use different SPA frameworks in different versions for our Microservice Clients.
=> The micro-frontend-angular-application can be a Single Page Application too.

Features of Mirco-Frontends
Each frontend represents a specific feature or subdomain of the entire application
Each frontend can be implemented with a separate team.
Each frontend can be implemented with different technology.
They cannot share logic and its independent of each other.
Each Frontend can be owned by a single team.
	