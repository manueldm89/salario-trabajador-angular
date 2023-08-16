import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Meses } from '../interfaces/meses.interface';
import { Empleado } from '../interfaces/empleado.interface';
import { Entregas } from '../interfaces/entregas.interface';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private baseUrl: string = environment.baseUrlApi;
  constructor(private http:HttpClient) { }


  getMeses(){
    return this.http.post<Meses>(`${this.baseUrl}/obtenermeses`,'');
  }

  obtenerInfoEmpleado(empleado: number){
    return this.http.post<Empleado>(`${this.baseUrl}/obtenerinfoempleado`, { empleado });
  }

  guardarEntregas(empleado: number, mes: number, entregas: number){
    return this.http.post<Entregas>(`${this.baseUrl}/guardarentregas`, { empleado, mes, entregas });
  }
}
