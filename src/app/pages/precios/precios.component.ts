import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { DataTarifasService } from '../../services/data-tarifa.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-precios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './precios.component.html',
  styleUrl: './precios.component.scss'
})
export class PreciosComponent {
    
    esAdmin = true
    dataTarifaServices = inject(DataTarifasService)
    
    UpdatePrice(TarifaId: string) {  // rateId para identificar la tarifa específica
      Swal.fire({
        title: "Actualiza la tarifa",
        html: `<input type="text" id="nuevoPrecio" class="swal2-input" placeholder="Ingrese nuevo precio">`,
        showCancelButton: true,
        confirmButtonText: "Actualizar",
        cancelButtonText: "Cancelar",
        willOpen: () => {
          const titleEl = document.querySelector('.swal2-title') as HTMLElement;
          const contentEl = document.querySelector('.swal2-html-container') as HTMLElement;
          if (titleEl) {
            titleEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
          }
          if (contentEl) {
            contentEl.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
          }
        },
        preConfirm: () => {
          const nuevoPrecioInput = document.getElementById("nuevoPrecio") as HTMLInputElement;
          if (!nuevoPrecioInput || !nuevoPrecioInput.value) {
            Swal.showValidationMessage("Por favor, ingrese un precio válido");
            return false;
          }
          return { nuevoPrecio: nuevoPrecioInput.value };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { nuevoPrecio } = result.value;
          await this.dataTarifaServices.UpdateTarifas(TarifaId, nuevoPrecio);
        }
      });
    }
}
