import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ReporteSimas } from '@models/stats_ooa_simas.model';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient
  ) { }

  // Se obtienen los montos promedio de las obras realizadas por el municipio.
  getMontosPromedio(): Observable<any> {
    return this.http.get<ReporteSimas>(`${this.baseUrl}/stats/reporte_municipio`)
      .pipe(map((res: ReporteSimas) => res.montoPromedio));
  }
  // Obtiene los reportes atendidos por SIMAS Torreón desde 2021 hasta 2024
  getReportesAtendidosSimasTorreon(): Observable<any> {
    return this.http.get(`${this.baseUrl}/stats/reportes_atendidos_simas_torreon`)
      .pipe(map((res: any) => res['grafica_reportes_resumen']));
  }
}
