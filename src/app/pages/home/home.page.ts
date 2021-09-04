import { Component, OnInit } from '@angular/core';
import { RegistroModel } from '../../models/registro.models';
import { RegistroService } from '../../services/registro.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';







@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  registro     = new  RegistroModel();
 

  clickedImage: string;

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }


  constructor(private rout:Router,
              private rS: RegistroService, 
              private route: ActivatedRoute, 
              private camera: Camera,
              ) {

              }

            

    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id') || '';          
      if ( id!=='nuevo' ) {          
      this.rS.getRegistro( id )
      .subscribe( (resp: any) => {
        this.registro = resp;
         this.registro.id = id;
    });            
  }
            
}
            

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
}
      if ( this.registro.id ) {
       this.rS.actualizarRegistro( this.registro)
        this.rout.navigate(['/']); 
      }else{
        const data =  this.registro; //Indicamos que vamos a guardar
        data.id = this.rS.createId();
        const enlace = 'Registros';//Indicamos donde queremos guardar
        this.rS.crearDocumento(this.registro, data.id)
  }
}
  
sacarFoto(){

  let cameraOptions : CameraOptions = {
      quality: 50,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 600,
      targetHeight: 400,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
  }


  this.camera.getPicture(cameraOptions).then((imageData) => {
    // imageData is a base64 encoded string
      this.registro.foto = "data:image/jpeg;base64," + imageData;
  }, (err) => {
      console.log(err);
  });
}

}