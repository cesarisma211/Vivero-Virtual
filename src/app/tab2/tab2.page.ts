import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../services/registro.service';
import { tablaModel } from '../models/tabla.models';
import { TablaService } from '../services/tabla.service';
import { RegistroModel } from '../models/registro.models';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2'
import { NgForm } from '@angular/forms';
import { InvoiceComponent } from '../pages/invoice/invoice.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';





@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  cotizaciones: tablaModel [] = [];
  registros: RegistroModel []=[];
  descripciones: RegistroModel[]=[];
  precios: RegistroModel[]=[];
  cotizacion     = new  tablaModel();
  total:number;
  tipoProductoChange: string = null;
  interval: any;



  constructor(private tS: TablaService, 
              private rout:Router,
              private rS: RegistroService,
              private modalCtrl: ModalController,
              ) {
            }
            ngOnInit(){
              this.tS.getRegistros().subscribe(resp =>{
                console.log(resp);
                this.cotizaciones = resp;
                
              })
          
              this.rS.getRegistros().subscribe(resp =>{
                console.log(this.registros);
                this.registros = resp;
          
              });
          
              this.tS.getRegistros().subscribe(resp =>{
                this.total = this.cotizaciones.reduce
                ((a, b) => a + (b.precio * b.cantidad),0);  
                this.cotizaciones = resp;
                console.log('Total: ', this.total);
          
              });
            }
          
  

       
  

  
  /* Factorizar función - Piero */
  getType(event, i: number) {
    console.log(event)
    this.descripciones = [] ;
    this.precios = []; //si el select cambia su valor, los valores del arreglo debe limpiarse
    this.rS.getRegistros().subscribe(resp => {
      resp.find(producto => { //busco el tipo según el valor del select, con la función find que solo se puede usar si es un arreglo
        if (producto.tipo == event.detail.value.toLowerCase()) { //el valor del select lo que tengo que convertir en minusculas, porque así lo trae tu base de datos
          this.descripciones.push(producto);
          this.precios.push(producto);//si la condición se cumple, entonces al arreglo descripciones, le coloco sus respectivos productos
      }
      console.log(this.descripciones)
   

      });
    });
  }


  agregarRegistro( form: NgForm ) {
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    if (this.cotizacion !== undefined) {      
      console.log('Guardar', this.cotizacion);
      const data =  this.cotizacion; //Indicamos que vamos a guardar
      data.id = this.tS.createId();
      const enlace = 'Cotizaciones';//Indicamos donde queremos guardar
      this.tS.crearDocumento(this.cotizacion, data.id);
    

    }



}             



borrarCotizacion(cotizacion: tablaModel, i: number){
  this.cotizaciones.splice(i, 1);
  this.tS.borrarRegistro(cotizacion.id);


}

async openInvoice(order) {
  const InvoiceModal = await this.createModal(InvoiceComponent, { order });
  await InvoiceModal.present();
}

async createModal(component, componentProps?, cssClass?): Promise<HTMLIonModalElement> {
  const modal = await this.modalCtrl.create({
    component,
    cssClass,
    componentProps,
    backdropDismiss: true
  });
  return modal;
}





}

