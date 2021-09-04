
import { Component, OnInit } from '@angular/core';
import { RegistroModel } from '../models/registro.models';
import { RegistroService } from '../services/registro.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

 registros : RegistroModel[]=[];
 interval: any;


  constructor(private rS: RegistroService, private router: Router) {

  }


  ngOnInit() {
    
            this.rS.getRegistros().subscribe(resp => this.registros = resp);
       }



borrarRegistro(registro: RegistroModel, i: number){
  this.registros.splice(i, 1);
  this.rS.borrarRegistro(registro.id);

}

}
