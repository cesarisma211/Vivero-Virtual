import { Injectable } from '@angular/core';
import { RegistroModel } from '../models/registro.models';

import { map } from 'rxjs/operators'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  registros: RegistroModel [] = [];


  constructor( private aF: AngularFirestore) { }



  crearDocumento(registro: RegistroModel, id: string) {
    const quoteData = JSON.parse(JSON.stringify(registro));
    return this.aF.collection('registros').doc(id).set(quoteData);
  }

 
  getRegistros() {
    const quotes = this.aF.collection<RegistroModel>('registros').snapshotChanges().pipe(
      map(actions => {
        return actions.map(
          c => ({
            postId: c.payload.doc.id,
            ...c.payload.doc.data()
          }));
      }));
    return quotes;
  }

 

  createId(){
   return this.aF.createId();
  }

  

  actualizarRegistro( registro: RegistroModel) {
    return this.aF.collection('registros/').doc(registro.id).update(JSON.parse(JSON.stringify(registro)));

  }


getRegistro(id: string) {
  return this.aF.doc('registros/' + id).valueChanges();

}


borrarRegistro(id: string) {
  return this.aF.doc('registros/' + id).delete();
}

}
