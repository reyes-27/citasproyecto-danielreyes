import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { CitaService } from 'src/app/servicios/cita.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Cita } from 'src/app/modelos/cita';

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['./agregar-cita.component.scss'],
  standalone: true,
  imports:[IonicModule, CommonModule, FormsModule]
})
export class AgregarCitaComponent implements OnInit {
  @Output() onCitaAgregada = new EventEmitter<Cita>();

  txtfrase = "";
  txtautor = "";

  constructor(private citaServicio: CitaService) {}

  aggCita() {

    const cita: Cita = {
      autor: this.txtautor,
      frase: this.txtfrase,
    };
    this.onCitaAgregada.emit(cita);
    console.log(cita.id, cita.autor, cita.frase);
  }

  ngOnInit() {}
}

