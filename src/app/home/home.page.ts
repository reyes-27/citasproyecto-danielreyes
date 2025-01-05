import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Preferences } from '@capacitor/preferences';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Cita } from 'src/app/modelos/cita';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { CitaService } from 'src/app/servicios/cita.service';
import { ConfiguracionService } from '../servicios/configuracion.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [RouterModule, IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  citaAleatoria: Cita | null = null;
  permiteBorrar: boolean = false;
  constructor(private citaService: CitaService, private configuracionService: ConfiguracionService) {
    addIcons({
      'settings-outline': settingsOutline,
    });
  }

  async eliminarCita(id: number) {
    if (id !== undefined){
     await this.citaService.delete(id)
    console.log("HIKA")
  }
  else{
    console.log("ID no válido");
  }
}
  async ngOnInit() {
    // window.location.reload();
    await this.citaService.iniciarPlugin();
    await this.cargarCitaAleatoria();
    const { value } = await Preferences.get({ key: 'permiteBorrar' });
    console.log(value)
    this.permiteBorrar = value === 'true';
  }

  async cargarCitaAleatoria() {
    this.citaAleatoria = await this.citaService.getCitaAleatoria();
    console.log('Cita aleatoria:', this.citaAleatoria);
  }
}
