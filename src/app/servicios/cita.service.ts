import { Injectable } from '@angular/core';
import { Cita } from '../modelos/cita';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private _citas:Cita[]=[]
  sqlite:SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  plat: string = ""
  DB_NAME: string = "lista_citas";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encryption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  TABLE_NAME: string = "LISTA_CITAS"
  COL_AUTOR: string = "AUTOR"
  COL_FRASE:string = "FRASE"
  DB_SQL_TABLAS:string = `
    CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME}(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    ${this.COL_AUTOR} TEXT NOT NULL,
    ${this.COL_FRASE} TEXT NOT NULL
  );    
  `
  db!:SQLiteDBConnection 
  constructor() { }

  private async _iniciarPluginWeb(): Promise<void> {    
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if( jeepSqliteEl != null ) {      
      await this.sqlite.initWebStore()            
    }
  }
  async iniciarPlugin() {    
    this.plat = Capacitor.getPlatform();
    if(this.plat == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion()
    await this.db.execute(this.DB_SQL_TABLAS)             
  }
  async abrirConexion() {                    
    const ret = await this.sqlite.checkConnectionsConsistency() 
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if(ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)      
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )

    }
    await this.db.open()
  }
   async prueba() {
    if (!this.db) {
      console.error('Base de datos no inicializada. Asegúrate de llamar a iniciarPlugin primero.');
      throw new Error('Base de datos no inicializada.');
    }
  }
  async getCitas(): Promise<Cita[]> {
    const query = `SELECT * FROM ${this.TABLE_NAME}`;
    const resultado = await this.db.query(query);
  

    if (resultado?.values && resultado.values.length > 0) {

      return resultado.values.map((fila: any) => ({
        id: fila.ID,
        autor: fila[this.COL_AUTOR],
        frase: fila[this.COL_FRASE],
      }));
    }
  
    // Si no hay datos, devolvemos un array vacío
    return [];
}
  async add(cita: Cita) {
    const query:string = `INSERT INTO ${this.TABLE_NAME} (${this.COL_AUTOR}, ${this.COL_FRASE}) VALUES (?, ?)`
    await this.db.run(query, [cita.autor, cita.frase])
    // Esta funcion agrega una cita a la lista de citas junto con su respectivo id.
    // if (this._citas.length > 0) {
    //   const lastCita = this._citas[this._citas.length - 1];
    //   cita.id = lastCita.id + 1;
    // } else {
    //   cita.id = 1;
    // }
    // this._citas.push(cita);
  }
  async delete(id: number) {
    const query:string = `DELETE FROM ${this.TABLE_NAME} WHERE id = (?);`
    await this.db.run(query, [id])
    // this._citas = this._citas.filter(cita => cita.id !== id);
  }

  async getCitaAleatoria(): Promise<Cita | null> {
    await this.prueba()
    const query = `SELECT * FROM ${this.TABLE_NAME} ORDER BY RANDOM() LIMIT 1`; // Para SQLite
    const resultado = await this.db.query(query);
  
    if (resultado?.values && resultado.values.length > 0) {
      const fila = resultado.values[0];
      return {
        id: fila.ID,
        autor: fila[this.COL_AUTOR],
        frase: fila[this.COL_FRASE],
      };
    }
  
    return null;
  }
}
