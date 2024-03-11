import { Component, OnInit } from '@angular/core';
import { ExampleDto, ExampleResponse, ResultadosBusquedaObras } from '@models/example.model';
import { ExampleService } from '@services/example.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  constructor(public llamadaApi: ExampleService) {

  }

  /* Creamos la variable datos para almacenar lo que se quiera enviar a la API
     para filtrar la información
   */
  private datos: ExampleDto = {
    tipo: ["avance", "monto"],
    objetivo: [["TERMINADA", "EN PROCESO"], [0, 40]]
  }

  public datosRespuesta: ExampleResponse = {
    resultados: [{
      descripcion: '',
      monto: 0,
      convenio: '',
      tipo: '',
      porcentaje_avance: 0,
      avance: '',
      origen: '',
      colonia: '',
      metros: '',
      placa: '',
      adjudicacion: '',
      contratista: '',
      participantes: '',
      lona_inicial: '',
      SobrePres: 0,
      obra: '',
      supervisor: '',
      estatus: '',
      galeria: '',
      AnioF: 0,
      fecha_inicial: '',
      convocatoria: '',
      licitacion: '',
      fecha_final: '',
      contrato: '',
      lat: 0,
      codigo: '',
      vigilancia: '',
      lon: 0
    }],
    filtros:
    {
      tipo: [''],
      objetivo: ['']
    }

  };

  public descipciones: any[] = [];

  /* ngOnInit es uno de varios métodos usados en el ciclo de vida de Angular.
  Se utiliza principalmente para inicializar datos y realizar tareas al
  inicializar un componente.
  En este caso vamos a usarlo para mostrar datos de la API */

  ngOnInit(): void {

    this.llamadaApi
      /* Para traer los datos usando el filtro
      usamos el método postDatos que creamos en el servicio example.service
      */
      .postDatos(this.datos)
      /* Usamos un subscribe para enlazarnos al servicio
      y poder capturar los datos */
      .subscribe(
        {
          // Next nos ayuda a traer la respuesta luego de que la conexión se establezca
          next: (respuesta) => {
            // Hacemos un print de la respuesta para observar en consola como aparece
            console.log('Respuesta_cruda_API: ', respuesta);
            this.datosRespuesta.resultados = respuesta.resultados;
            // Obtenemos las keys y values del diccionario JSON que recibimos desde la API.
            /*
            {
              key_1:value_1,
              key_2:value_2,
              ...
            }
            */
            const keys = Object.keys(respuesta.resultados[0]);
            const values = Object.values(respuesta.resultados[0]);
            // Hacemos un print de lo anterior para verlo en la consola.
            console.log('Keys', keys)
            console.log('Values', values)

            // Usamos el método integrado map, para transformar la respuesta.
            // En este caso, solo queremos las descripciones, pero si borras descripciones
            // y colocas solo res. veras todas las opciones que pueden extraerse gracias
            // a las interfaces que creaste. Pueden ser AnioF, colonia, codigo, avance, etc
            const descipciones = respuesta.resultados.map((res) => res.descripcion);
            this.descipciones = descipciones;

          },
          error: (error) => {
            console.log(error);
          }
        }
      )

  }

}
