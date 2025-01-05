import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ListaDeCitasComponent } from 'src/app/componentes/lista-de-citas/lista-de-citas.component';
import { AgregarCitaComponent } from 'src/app/componentes/agregar-cita/agregar-cita.component';
import { Cita } from 'src/app/modelos/cita';
import { CitaService } from 'src/app/servicios/cita.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    ListaDeCitasComponent,
    AgregarCitaComponent,
  ],
})
export class CitasPage implements OnInit {
  citas:Cita[]=[
  ]
  constructor(private citaService: CitaService) {
  }
  async ngOnInit() {
    await this.citaService.iniciarPlugin()
  }
  async agregarCita(cita: Cita) {
    await this.citaService.add(cita);
    this.citas = await this.citaService.getCitas();
  }
  async eliminarCita(id: number) {
    await this.citaService.delete(id);
    this.citas = await this.citaService.getCitas();
  }


}
