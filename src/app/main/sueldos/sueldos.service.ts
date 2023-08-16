import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Sueldo } from '../interfaces/sueldo.interface';
import { Datosempleados } from '../interfaces/datos-empleados.interface';

@Injectable({
  providedIn: 'root'
})
export class SueldosService {

  private baseUrl: string = environment.baseUrlApi;
  constructor(private http:HttpClient) { }

  obtenerEmpleados(){
    return this.http.post<Datosempleados>(`${this.baseUrl}/obtenerempleados`, '');
  }

  obtenerSueldoEmpleado(empleado: number, mes: number){
    console.log(empleado)
    return this.http.post<Sueldo>(`${this.baseUrl}/sueldoempleado`, { empleado, mes });
  }
}
