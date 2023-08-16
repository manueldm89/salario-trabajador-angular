import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{

  movPagina: boolean = false;
  constructor(private router: Router){}

  items!: MenuItem[];  
  position: string = 'top';
  arrOpciones: Array<any> = [
    {rlink: './empleados', src: '../../../assets/images/empleado.png', text:'Empleados', id: 1},
    {rlink: './movimientos', src: '../../../assets/images/movimientos.png', text:'Movimientos', id: 2},
    {rlink: './sueldos', src: '../../../assets/images/pagos.png', text:'Sueldos', id: 3}
  ]

  ngOnInit(): void {
    this.movPagina = false;    
  }

  moverVisor(){
    this.movPagina = true;
  }

  regresar(){
    this.movPagina = false;
    this.router.navigateByUrl('');
  }
}
