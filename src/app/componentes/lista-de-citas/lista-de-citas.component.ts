import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Cita } from 'src/app/modelos/cita';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { CitaService } from 'src/app/servicios/cita.service';

import {IonList, IonItem, IonLabel, IonCheckbox, CheckboxChangeEventDetail} 
                          from '@ionic/angular/standalone'
@Component({
  selector: 'app-lista-de-citas',
  templateUrl: './lista-de-citas.component.html',
  styleUrls: ['./lista-de-citas.component.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule, FormsModule],
})

export class ListaDeCitasComponent  implements OnInit {
  @Input() citas:Cita[]=[
  ]
  @Output() onCitaEliminada = new EventEmitter<number>();

  eliminarCita(id: number) {
    this.onCitaEliminada.emit(id);
  }
  
  constructor(private service:CitaService) {
    addIcons({
      'trash': trash,
    });
  }

  async ngOnInit() {
    await this.service.iniciarPlugin(); // Inicializa el plugin
    const citas = await this.service.getCitas(); // Recupera las citas desde el servicio
    this.citas = citas; // Actualiza la propiedad 'citas' del componente
    
  }


}
