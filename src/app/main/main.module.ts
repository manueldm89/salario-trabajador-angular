import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main.routing.module';
import { StartComponent } from './start/start.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { MovimientosComponent } from './movimientos/movimientos.component';

import { MatToolbarModule } from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatListModule} from '@angular/material/list';
import { SueldosComponent } from './sueldos/sueldos.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    StartComponent,
    EmpleadosComponent,
    MovimientosComponent,
    SueldosComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ]
})
export class MainModule { }
