import { Component, AfterViewInit, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { QualificationService } from '../qualification.service';
import { HelperService } from '../../shared/helper.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal-detail-init.component.html',
})
export class ModalDetailInitComponent implements AfterViewInit {

  public dialogConfig = new MatDialogConfig();
  public id:string;

  constructor(public dialog: MatDialog, private router:Router, private route:ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      if(!this.id){
        this.router.navigate(['/calificar/archivos']); 
      }
    });
  }

   ngAfterViewInit() {
    setTimeout(() => {
        this.openDialog()
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalDetailComponent,{data:{id:this.id}});
    dialogRef.disableClose = true;
    
    
    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.removeItem('tmp');
      this.router.navigate(['/calificar/archivos']);    
    });
  }
}

@Component({
  selector: 'app-modal-detail',
  templateUrl: './modal-detail.component.html',
  styleUrls: ['./modal-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalDetailComponent  implements OnInit {

  
  public tabs:any
  public showPage = 0;
  public click=0;
  public loading = false;


  constructor(public config: NgbCarouselConfig,
    @Inject(MAT_DIALOG_DATA) public data:any, 
    public qualificationService:QualificationService, 
    public helperService:HelperService) {
    this.config.interval = 3150000000000;
    this.config.wrap = true;
    this.config.keyboard = true;
    this.config.pauseOnHover = true;
    this.config.showNavigationArrows = true;
    this.config.showNavigationIndicators = true;

  }

  onSlide(event){
    this.click++;
    let total = this.tabs.Paginas.length;
    
    if(this.click >= total){
      this.showPage = 0;
      this.click=0;
    }else{
      this.showPage++;
    }
    
  }

  ngOnInit() {  
    this.getMetada();
  }

  

  getMetada(){
    this.loading = true;

    this.qualificationService.getMetadata(this.data.id).finally(() => {
      this.loading = false;
    })
    .subscribe((response) => {      
    
      this.tabs= response;
      sessionStorage.setItem('tmp',JSON.stringify(this.tabs));

      this.config.showNavigationArrows = this.tabs.Paginas.length > 1 ? true: false;
      this.config.showNavigationIndicators = this.tabs.Paginas.length > 1 ? true: false;
    
      if(response.length ==0) {
        sessionStorage.removeItem('tmp');
        this.helperService.showWarning('!Atencion!', 'no encotraron datos');
      }
    }, (error) => {
      this.helperService.showError('Error', error.message || 'No se ha encontrado información del error');
    })  

  }

  buildDataSave(){
    let data = {
      id_documento: this.tabs.IdDocumento,
      id_archivo: this.tabs.Paginas[this.showPage].IdArchivo,
      datos:[]
    }

    for(let modules of this.tabs.Paginas[this.showPage].Modulos){
      let type = modules.Titulo;
      for(let metadata  of  modules.Datos){
        data.datos.push({
          etiqueta: metadata.Etiqueta,
          valor: metadata.Valor,
          tipo: type,
        })
      }
    }

    return data;
  }
  
  save(){
    this.loading = true;
    let data = this.buildDataSave();
    this.qualificationService.saveMetadata(data).finally(() => {
      this.loading = false;
    })
    .subscribe((response) => {      
    
      sessionStorage.setItem('tmp',JSON.stringify(this.tabs));
      this.helperService.showSuccess('!Exito!', 'Cambios guardados');

    }, (error) => {
      this.helperService.showError('Error', error.message || 'No se ha encontrado información del error');
    }) 

  }

  restart(){
    this.tabs = JSON.parse(sessionStorage.getItem('tmp'));
  }
}
