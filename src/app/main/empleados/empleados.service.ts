import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Numeroempleado } from '../interfaces/numero-empleado.interface';
import { GuardadoEmpleado } from '../interfaces/guardado-empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private baseUrl: string = environment.baseUrlApi;
  constructor(private http:HttpClient) { }

  getNumeroEmpleado(){
    return this.http.post<Numeroempleado>(`${this.baseUrl}/obtenernumsig`,'');
  }

  guardarEmpleado(empleado:number, nombre:string, puesto: number){
    return this.http.post<GuardadoEmpleado>(`${this.baseUrl}/creartrabajador`, {empleado, nombre, puesto});
  }
}
