import { Component, OnInit } from '@angular/core';
import { MovimientosService } from './movimientos.service';
import { Meses } from '../interfaces/meses.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Empleado } from '../interfaces/empleado.interface';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit{

  cargarPantalla: boolean = false;
  mostrarSpinner: boolean = false;
  numeroEmpleado: string = '';
  numeroEntregas: string = '';
  nombreEmpleado: string = '';
  rolEmpleado: string = '';
  numeromes: string = '';
  mesSeleccionado: number = 0;

  constructor(private movimientosService:MovimientosService, private _snackBar: MatSnackBar ){}

  ngOnInit(): void {
    this.obtenerMeses();
  }

  resulMeses!: Meses;
  resulEmpleado!: Empleado;
  selectedMonth: string = '';

  obtenerMeses(){
    this.movimientosService.getMeses()
      .subscribe(result => {
        this.resulMeses = result;
        this.cargarPantalla = true;
      });
  }

  onEnter(event: any) {
    this.obtenerInforEmpleado(+this.numeroEmpleado);
  }

  obtenerInforEmpleado(empleado:number){
    this.mostrarSpinner = true;
    this.movimientosService.obtenerInfoEmpleado(empleado)
      .subscribe(result => {
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
      });
  }

  guardarEntregas(){
    if (this.numeroEmpleado == '' || +this.mesSeleccionado == 0 || this.numeroEntregas == ''){
      this._snackBar.open('Por favor, ingrese los datos completos', 'Cerrar', {
        duration: 3000
      });
      return;
    }
    this.mostrarSpinner = true;
    this.movimientosService.guardarEntregas(+this.numeroEmpleado, +this.mesSeleccionado, +this.numeroEntregas)
      .subscribe(result =>{
        console.log(result);
        switch (result.result[0].resultado) {
          case 1:
            this._snackBar.open('Registro con exito', 'Cerrar', {
              duration: 3000
            });
            break;
          case -1:
            this._snackBar.open('Ya se registró esta información anteriormente', 'Cerrar', {
              duration: 3000
            });
            break;
          default:
            break;
        }
        this.mostrarSpinner = false;
      })
      this.limpiar();
  }

  limpiar(){
    this.numeroEmpleado = '';
    this.numeroEntregas = '';
    this.nombreEmpleado = '';
    this.rolEmpleado = '';
    this.mesSeleccionado = 0;
    
  }
}
