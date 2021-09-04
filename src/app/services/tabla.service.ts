import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { delay, map } from 'rxjs/operators'
import { tablaModel } from '../models/tabla.models';


import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TablaService {
  cotizaciones: tablaModel [] = [];

 


  
  constructor(private http: HttpClient, private aF: AngularFirestore) { }



  crearDocumento(cotizacion: tablaModel, id: string) {
    const quoteData = JSON.parse(JSON.stringify(cotizacion));
    return this.aF.collection('cotizaciones').doc(id).set(quoteData);
  }

 
  getRegistros() {
    const quotes = this.aF.collection<tablaModel>('cotizaciones').snapshotChanges().pipe(
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

  


  actualizarRegistro( cotizacion: tablaModel) {
    return this.aF.collection('cotizaciones/').doc(cotizacion.id).update(JSON.parse(JSON.stringify(cotizacion)));

  }



getRegistro(id: string) {
  return this.aF.doc('cotizaciones/' + id).valueChanges();

}


borrarRegistro(id: string) {
  return this.aF.doc('cotizaciones/' + id).delete();
}

}