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
    this.items = [
      {
          label: 'Empleados',
      },
      {
          label: 'Movimientos',
      }
    ];
    
  }

  // direccionar(opcion:number){
  //   switch (opcion) {
  //     case 1:
  //       this.router.navigateByUrl('./empleados');
  //       break;
  //     case 2:
  //       this.router.navigateByUrl('./movimientos');
  //       break;
  //     case 3:
  //       this.router.navigateByUrl('./sueldos');
  //       break;
  //     default:
  //       break;
  //   }
  // }

  moverVisor(){
    this.movPagina = true;
  }

  regresar(){
    this.movPagina = false;
    this.router.navigateByUrl('');
  }
}
