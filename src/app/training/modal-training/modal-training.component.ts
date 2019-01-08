import { Component, AfterViewInit, ViewChild, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../shared/helper.service';
import { FileService } from '../../shared/file.service';
import { TrainingService } from '../training.service';
import { MarkerComponent } from '../../shared/marker/marker.component'
import { ImageModel } from '../../core/models/Image.model';

@Component({
  selector: 'app-modal-training-init',
  templateUrl: './modal-training-init.component.html',
})
export class ModalTrainingInitComponent {

  public dialogConfig = new MatDialogConfig();
  public id_document:string;
  public id_image:string;
  public point:ImageModel;
  public backgrount:ImageModel;
  public image = {
    base64: '', 
    ext:''
  }

  constructor(public dialog: MatDialog, 
    public helperService:HelperService,
    private router:Router,
    public fileService:FileService,
    private route:ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id_document = params.id_document;
      this.id_image = params.id_image;
      if(!this.id_document || !this.id_image){
        this.router.navigate(['/entrenador/lista']); 
      }
    });
  }

  setDataMarker(){
    let image = new Image();
    image.src = './assets/images/point.png'
    this.point = {
      image: image,
      width: 15,
      height:15,
      xpos:0,
      ypos:0,
    }

    this.backgrount = {
      image: new Image(),
      width: 800,
      height:800,
      xpos:0,
      ypos:0,
    }
  }

   ngAfterViewInit() {
      this.setDataMarker()
      this.getImagesForTrainig();
  }

  openDialog() {
    const dialogRef = this.dialog.open(
      ModalTrainingComponent,
      {
        data: {
          id_image:this.id_image,
          id_document:this.id_document,
          backgrount:this.backgrount,
          point: this.point
        }
      });

    dialogRef.disableClose = true;    
    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.removeItem('tmp');
      this.router.navigate(['/entrenador/lista']); 
    });
  }

  getImagesForTrainig(){
    let backgrount = new Image();
    let image;
    this.fileService.getFilesToBase64(this.id_document).finally(() =>{
      if(image){
        this.backgrount.image = backgrount;
      }
      this.openDialog();
    }).subscribe((response)=>{
      image = response.Imagenes.filter((image) => {return image.IdDocumentoImagen == this.id_image;});
      if(image){
        this.image.base64 =image[0].DocumentoImagen;
        this.image.ext = image[0].MimeTypeIm
        backgrount.src = this.helperService.getUrlBase64(this.image);
      }
     
    },(error) => {
      if(error.status == 500){
        this.helperService.showError('Error', error.message || 'No se ha encontrado información del error');
      }

      if(error.status == 404 ){
        this.helperService.showWarning('!Atencion!', error.message);
      }
    })  
  }

}

@Component({
  selector: 'app-modal-training',
  templateUrl: './modal-training.component.html',
  styleUrls: ['./modal-training.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalTrainingComponent  implements OnInit {

  @ViewChild(MarkerComponent) markerComponent: MarkerComponent;
  public type_document;
  
  public opciones = [
    {
      texto:'INE',
      valor: 1,
    },
    {
      texto:'TELMEX',
      valor: 2,
    },
    {
      texto:'lUZ',
      valor: 3,
    }
  ]

  public markers = []
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
    public dialogRef: MatDialogRef<ModalTrainingInitComponent>,
    public trainingService:TrainingService,
    public helperService:HelperService) {
  }

  ngOnInit() {  
  }


  save(){
    let coordinantes =[];

    for(let marker of this.markers){
      coordinantes.push({"Coordenadax":marker.xpos,"Coordenaday":marker.ypos})
    }

    let data ={
      IdArchivo: this.data.id_image,
      Coordenadas:coordinantes,
      Tipo: this.type_document
    }

    this.trainingService.saveCoordinates(data).finally(()=>{

    }).subscribe((response)=>{
      this.helperService.showSuccess('!Exito!', 'Datos guardados');
    },(error) => {
      if(error.status == 500){
        this.helperService.showError('Error', error.message || 'No se ha encontrado información del error');
      }
    })
    
    this.dialogRef.close();
  }

  removeMarkerAll(){
    this.markerComponent.clear()
  }

  handle(event){
    this.markers = event;
    console.log(this.markers )
  }

  validateSave(){
    let response= true;
    if(this.type_document && this.markers.length > 0){
      response= false;
    }
    return response;
  }

 
}
