import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../shared/helper.service';
import { ViewfinderService } from '../viewfinder.service'


@Component({
  selector: 'app-viewfinder',
  templateUrl: './viewfinder.component.html',
  styleUrls: ['./viewfinder.component.css']
})
export class ViewfinderComponent implements OnInit {

  public params: any
  public text= [];
  public showText= false;

  public loading = false;

  constructor(private router:Router,private activatedRoute: ActivatedRoute,public helperService:HelperService, public viewfinderService:ViewfinderService) {
    this.activatedRoute.queryParams.subscribe(params => {
          this.params = params;
          console.log(params);
      });
  }

  ngOnInit() {
    this.getDataForShow();
  }

  getDataForShow(){

    this.viewfinderService.getDataForShow(this.params.id_documento).finally(() => {
      if(this.params.view == 1){
        this.router.navigate(['/subir/archivos']);    
      }
    })
    .subscribe((response) => {   
      if( this.params.view == 1 || this.params.view == 3){

        let file  ={
          mime_type: this.helperService.getMimeType(response.MimeType),
          content:response.DocumentoOriginal,
         }

        this.helperService.generateView(file)
      }

      if( this.params.view == 2 || this.params.view == 3){
        this.text = response.ListaPagina;
        this.showText= true;

      }

      
    }, (error) => {
      this.helperService.showError('Error', error.message || 'No se ha encontrado información del error');
    })

  }

}
