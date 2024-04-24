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

  getMontosPromedio(): Observable<any> {
    return this.http.get<ReporteSimas>(`${this.baseUrl}/stats/reporte_simas`)
      .pipe(map((res: ReporteSimas) => res.montoPromedio));
  }
}
