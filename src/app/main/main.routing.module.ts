import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { SueldosComponent } from './sueldos/sueldos.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    children:[
      {
        path: 'empleados',
        component: EmpleadosComponent
      },
      {
        path:'movimientos',
        component: MovimientosComponent
      },
      {
        path:'sueldos',
        component: SueldosComponent
      },
      {
        path:'**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }