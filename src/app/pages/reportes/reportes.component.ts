import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataEstacionamientosService } from '../../services/data-estacionamiento.service';
import { CommonModule } from '@angular/common';
import { DataAuthService } from '../../services/data-auth.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {

  dataEstacionamientoService = inject(DataEstacionamientosService)

}
