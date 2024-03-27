# URBISMAPCAP

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Instalaciones adicionales

Instalación de librerías en caso de perder configuración de npm:

- D3.js

`npm install d3`

- Leaflet

`npm install leaflet @types/leaflet`

- Bootstrap

  1.- Instalar bootstrap

`npm install bootstrap bootstrap-icons`

2.- Actualizar el archivo de angular.json con:

`"styles": ["./node_modules/bootstrap/dist/css/bootstrap.css",              "src/styles.css"                          ],            "scripts": [              "./node_modules/jquery/dist/jquery.js",              "./node_modules/bootstrap/dist/js/bootstrap.js"            ]
`
