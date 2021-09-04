import { Component, OnInit } from '@angular/core';
import { tablaModel } from '../../models/tabla.models';
import { TablaService } from '../../services/tabla.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  cotizacion     = new  tablaModel();


  constructor(private tS: TablaService,private route: ActivatedRoute, private rout:Router,
    ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id') || '';
            
    if ( id!=='nuevo' ) {

      this.tS.getRegistro( id )
        .subscribe( (resp: any) => {
          this.cotizacion = resp;
          this.cotizacion.id = id;
        });

    }
  }

  actualizarRegistro( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }
      if ( this.cotizacion.id ) {
       this.tS.actualizarRegistro( this.cotizacion)
        this.rout.navigate(['/tabs/tab2']); 
      }else{
  
     
      }
    

      }

}
