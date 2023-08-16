import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovimientosService } from '../movimientos/movimientos.service';
import { Empleado } from '../interfaces/empleado.interface';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit{
  opcion1: boolean = false;
  opcion2: boolean = false;
  opcion3: boolean = false;
  
  puestoSeleccionado: number = 0;
  numeroEmpleado: string = '';
  nombreEmpleado: string = '';
  mostrarPantalla: boolean = false;
  mostrarSpinner: boolean = false;
  editar: boolean = false;
  respNumEmpleado: string = '';
  resulEmpleado!: Empleado;
  rolEmpleado: string = '';

  constructor(private empleadoService: EmpleadosService, private _snackBar: MatSnackBar, private router: Router, private empladoDatosService: MovimientosService){}

  ngOnInit(): void {
    this.obtenerNumeroEmpleado();
  }

  checkChanged(selectedOption: number) {
    if (selectedOption === 1) {
      this.opcion2 = false;
      this.opcion3 = false;
    } else if (selectedOption === 2) {
      this.opcion1 = false;
      this.opcion3 = false;
    } else if (selectedOption === 3) {
      this.opcion1 = false;
      this.opcion2 = false;
    }
    if(this.opcion1 == false && this.opcion2 == false && this.opcion3 == false){
      this.puestoSeleccionado = 0;
      return;
    }
    this.puestoSeleccionado = selectedOption;
  }

  obtenerNumeroEmpleado(){
    this.empleadoService.getNumeroEmpleado()
      .subscribe( result => {
        this.numeroEmpleado = ''+result.result.numsiguiente;
        this.respNumEmpleado = ''+result.result.numsiguiente;
        this.mostrarPantalla = true;
        this.mostrarSpinner = false;
      })
  }

  nuevoEmpleado(){
    this.mostrarSpinner = true;
    // this.limpiar();
    this.obtenerNumeroEmpleado();
  }

  limpiar(){
    this.puestoSeleccionado = 0;
    this.nombreEmpleado = '';
    this.opcion1 = false;
    this.opcion2 = false;
    this.opcion3 = false;
    if(this.editar){
      this.editar = false;
      this.numeroEmpleado = this.respNumEmpleado;
    }
    else{
      this.nuevoEmpleado();
    }
  }
  guardarEmpleado(){
    if( this.puestoSeleccionado == 0 || this.nombreEmpleado == ''){
      this._snackBar.open('Favor de llenar todos los campos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.mostrarSpinner = true;
    this.empleadoService.guardarEmpleado(+this.numeroEmpleado, this.nombreEmpleado, this.puestoSeleccionado)
      .subscribe(result => {
        if(result.result.estatus == 1){
          this._snackBar.open('Empleado guardado exitoso', 'Cerrar', {
            duration: 3000
          });
        }
        else{
          this._snackBar.open('Ocuurio un error, intente de nuevo', 'Cerrar', {
            duration: 3000
          });
        }
        this.mostrarSpinner = false;
        // this.nuevoEmpleado();
        this.limpiar();
      })
  }

  editarEmpleado(){
    this.numeroEmpleado = '';
    this.editar = true;
  }

  onEnter(event: any) {
    if(this.numeroEmpleado.length == 5)
      this.obtenerDatosEmpleado();
  }

  obtenerDatosEmpleado(){
    this.mostrarSpinner = true;
    this.empladoDatosService.obtenerInfoEmpleado(+this.numeroEmpleado)
    .subscribe(result =>{
      if(result.result.length == 0){
        this._snackBar.open('No existe empleado', 'Cerrar', {
          duration: 3000
        });
        this.mostrarSpinner = false;
        this.limpiar();
        return;
      }
      this.resulEmpleado = result;
      this.nombreEmpleado = this.resulEmpleado.result[0].nombre_empleado;
      this.rolEmpleado = this.resulEmpleado.result[0].puesto;
      this.mostrarSpinner = false;

      switch (this.rolEmpleado) {
        case 'chofer':
          this.opcion1 = true;
          this.puestoSeleccionado = 1;
          break;
        case 'cargador':
          this.opcion2 = true;
          this.puestoSeleccionado = 2;
          break;
        case 'auxiliar':
          this.opcion3 = true;
          this.puestoSeleccionado = 3;
          break;      
        default:
          break;
      }
    })
  }
  cancelar(){
    this.limpiar();
  }
  

}
