import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "@environments/environment";
import { ExampleDto, ExampleResponse } from '@models/example.model';

// El decorador "Injectable" le dice a Angular que trate como un servicio inyectable a esta clase.
// Gracias a este Injectable y a providedIn: 'root', Angular sabe que puede usarlo dentro de cualquier componente
// de la aplicación, lo que facilita importarlo desde cualquier lugar.
@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  private baseUrl: string = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  //Métodos para traer datos desde alguna API externa.
  getDatos() {

  }
  /*
  create_menu(dto: Menu) {
    const token = this.tokenService.getToken();
    return this.http.post<DayMenuStatusResponse>(`${this.apiUrl}/api/create_menu/`, dto, { context: checkToken() });
  }
  */

  // En este ejemplo, se hace una llamada a la API por el método post.
  // dto hace referencia a Data Transfer Object, que será la forma en la que le enviamos la información
  // para la transferencia de datos. En nuestro caso para los filtros, usamos lo siguiente:
  // {"tipo":["avance", "monto"],"objetivo":[["TERMINADA", "EN PROCESO"],[0,40]]}
  postDatos(dto: ExampleDto) {
    //console.log(`${this.baseUrl}/obras_municipio/obras/busqueda`);
    return this.http.post<ExampleResponse>(`${this.baseUrl}/obras_municipio/obras/busqueda`, dto);
  }


}
