import { Component, OnInit, Input } from '@angular/core';

import { TablaService } from '../../services/tabla.service';
import { tablaModel } from '../../models/tabla.models';

import { ModalController } from '@ionic/angular';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';

import domtoimage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';




@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  @Input() order;
  cotizaciones: tablaModel [] = [];
  total:number;
  content: string;



  constructor(private tS: TablaService,
              private modalContrller: ModalController, 
              private pdfGenerator: PDFGenerator,
              private file: File,
              private fileOpener: FileOpener ) { 

              }

  ngOnInit() {

    this.tS.getRegistros().subscribe(resp =>{
      console.log(resp);
      this.cotizaciones = resp;
      
    })


    this.tS.getRegistros().subscribe(resp =>{
      this.total = this.cotizaciones.reduce
      ((a, b) => a + (b.precio * b.cantidad),0);  
      this.cotizaciones = resp;
      console.log('Total: ', this.total);

    });



  }

  closeModal() {
    this.modalContrller.dismiss();
  }
  downloadInvoice() {
    var node = document.getElementById('viveross');
 
    domtoimage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            document.body.appendChild(img);
            var link = document.createElement('a');
            link.download = 'vivero.jpeg';
            link.href = dataUrl;
            link.click();
       
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });


        this.content = document.getElementById('viveross').innerHTML;
        let options = {
          documentSize: 'A4',
          type: 'share',
          // landscape: 'portrait',
          fileName: 'viveros.pdf'
        };
        this.pdfGenerator.fromData(this.content, options)
          .then((base64) => {
            console.log('OK', base64);
          }).catch((error) => { 
            console.log('error', error);
          });
  }

}

