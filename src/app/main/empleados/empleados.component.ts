import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  numeroEmpleado: number = 0;
  nombreEmpleado: string = '';
  mostrarPantalla: boolean = false;
  mostrarSpinner: boolean = false;
  constructor(private empleadoService: EmpleadosService, private _snackBar: MatSnackBar){}

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
        this.numeroEmpleado = result.result.numsiguiente;
        this.mostrarPantalla = true;
        this.mostrarSpinner = false;
      })
  }

  nuevoEmpleado(){
    this.mostrarSpinner = true;
    this.puestoSeleccionado = 0;
    this.nombreEmpleado = '';
    this.opcion1 = false;
    this.opcion2 = false;
    this.opcion3 = false;
    this.obtenerNumeroEmpleado();
  }

  guardarEmpleado(){
    if( this.puestoSeleccionado == 0 || this.nombreEmpleado == ''){
      this._snackBar.open('Favor de llenar todos los campos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.mostrarSpinner = true;
    this.empleadoService.guardarEmpleado(this.numeroEmpleado, this.nombreEmpleado, this.puestoSeleccionado)
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
        this.nuevoEmpleado();
      })
  }
  

}
