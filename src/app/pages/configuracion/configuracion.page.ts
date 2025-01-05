import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ConfiguracionPage implements OnInit {
  permiteBorrar: boolean = false;

  constructor(private configuracionService: ConfiguracionService) {}

  async ngOnInit() {
    this.permiteBorrar = await this.configuracionService.getPermiteBorrar();
  }

  async guardarConfiguracion() {
    await this.configuracionService.setPermiteBorrar(this.permiteBorrar);
    window.location.reload();
  }
}