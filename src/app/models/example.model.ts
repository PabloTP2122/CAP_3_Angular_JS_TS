export interface ResultadosBusquedaObras {
  descripcion: string;
  monto: number;
  convenio: string;
  tipo: string;
  porcentaje_avance: number;
  avance: string;
  origen: string;
  colonia: string;
  metros: string;
  placa: string;
  adjudicacion: string;
  contratista: string;
  participantes: string;
  lona_inicial: string;
  SobrePres: number;
  obra: string;
  supervisor: string;
  estatus: string;
  galeria: string;
  AnioF: number;
  fecha_inicial: string;
  convocatoria: string;
  licitacion: string;
  fecha_final: string;
  contrato: string;
  lat: number;
  codigo: string;
  vigilancia: string;
  lon: number;
}

export interface Filtros {
  tipo: string[];
  objetivo: string[] | number[];
}

/* export interface ObrasBusqueda {
  resultados: ResultadosBusquedaObras[];
  filtros: Filtros;
} */


export interface ExampleResponse {
  resultados: ResultadosBusquedaObras[];
  filtros: Filtros;
}

export interface ExampleDto {
  tipo: string[]
  objetivo: [string[], number[]]
}
