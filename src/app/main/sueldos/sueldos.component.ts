import { Component, OnInit } from '@angular/core';
import { SueldosService } from './sueldos.service';
import { Datosempleados } from '../interfaces/datos-empleados.interface';
import { Sueldo } from '../interfaces/sueldo.interface';
import { MovimientosService } from '../movimientos/movimientos.service';
import { Meses } from '../interfaces/meses.interface';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sueldos',
  templateUrl: './sueldos.component.html',
  styleUrls: ['./sueldos.component.css']
})
export class SueldosComponent implements OnInit{

  mostrarPantalla: boolean = false;
  mostrarSpinner: boolean =  false;
  mostrarSueldo: boolean =  false;
  empleadoSeleccionado: number = 0;
  mesSeleccionado: number = 0;
  empleados!: Datosempleados;
  numeroEmpleado: string = '';
  nombreEmpleado: string = '';
  sueldoEmpleado!: Sueldo;
  sueldoDesglosado!: any;
  resulMeses!: Meses;

  constructor(private sueldoService: SueldosService, private mesesService: MovimientosService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.mostrarSpinner = true;
    this.obtenerEmpleados();
    this.obtenerMeses();
  }

  obtenerEmpleados(){
    this.sueldoService.obtenerEmpleados()
      .subscribe(result =>{
        this.empleados = result;
        // this.mostrarPantalla = true;
        this.mostrarSpinner = false;
      })
  }

  onSelect(){
    if(this.mesSeleccionado == 0 || this.empleadoSeleccionado == 0){
      // this._snackBar.open('Favor de seleccionar alguna opción', 'Cerrar', {
      //   duration: 3000
      // });
      return;
    }
    this.mostrarSpinner = true;
    this.obtenerSueldo();
  }

  obtenerSueldo(){
    this.sueldoService.obtenerSueldoEmpleado(+this.empleadoSeleccionado, +this.mesSeleccionado)
      .subscribe(result => {
        this.sueldoEmpleado = result;
        this.sueldoDesglosado = this.sueldoEmpleado.result[0];
        this.mostrarSueldo = true;
        this.mostrarSpinner = false;
      });
  }

  obtenerMeses(){
    this.mesesService.getMeses()
      .subscribe(result => {
        this.resulMeses = result;
        this.mostrarPantalla = true;
      })
  }
}
