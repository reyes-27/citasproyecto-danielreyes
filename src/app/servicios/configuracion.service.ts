import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  private readonly PERMITE_BORRAR_KEY = 'permiteBorrar';

  constructor() {}


  async setPermiteBorrar(valor: boolean): Promise<void> {
    await Preferences.set({
      key: this.PERMITE_BORRAR_KEY,
      value: String(valor),
    });
  }


  async getPermiteBorrar(): Promise<boolean> {
    const { value } = await Preferences.get({ key: this.PERMITE_BORRAR_KEY });
    return value === 'true';
  }
}
