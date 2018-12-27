import { Component, AfterViewInit, ViewChild, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../shared/helper.service';
import { ImgMapComponent } from 'ng2-img-map';
import { FileService } from '../../shared/file.service';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-modal-training-init',
  templateUrl: './modal-training-init.component.html',
})
export class ModalTrainingInitComponent {

  public dialogConfig = new MatDialogConfig();
  public id_document:string;
  public id_image:string

  constructor(public dialog: MatDialog, private router:Router, private route:ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id_document = params.id_document;
      this.id_image = params.id_image;
      if(!this.id_document || !this.id_image){
        this.router.navigate(['/entrenador/lista']); 
      }
    });
  }

   ngAfterViewInit() {
    setTimeout(() => {
        this.openDialog()
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalTrainingComponent,{data:{id_image:this.id_image,id_document:this.id_document}});
    dialogRef.disableClose = true;
    
    
    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.removeItem('tmp');
      this.router.navigate(['/entrenador/lista']); 
    });
  }

}


@Component({
  selector: 'app-modal-training',
  templateUrl: './modal-training.component.html',
  styleUrls: ['./modal-training.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalTrainingComponent  implements OnInit {

  public type_document;
  public image = {
    base64: '', 
    ext:''
  }
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

  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
    public helperService:HelperService,
    public dialogRef: MatDialogRef<ModalTrainingInitComponent>,
    public fileService:FileService,
    public trainingService:TrainingService) {
  }

  ngOnInit() {  
    this.getImagesForTrainig();
  }
  
  @ViewChild('imgMap')
  imgMap: ImgMapComponent;
  markers: number[][] = [];
  onMark(marker: number[]) {
    //console.log('Markers', this.markers);
  }
  onChange(marker: number[]) {
    //console.log('Marker', marker);
  }
  selectMarker(index: number) {
    this.imgMap.markerActive = index;
    this.imgMap.draw();
  }
  removeMarker(index: number) {
    this.markers.splice(index, 1);
    if (index === this.imgMap.markerActive) {
      this.imgMap.markerActive = null;
    } else if (index < this.imgMap.markerActive) {
      this.imgMap.markerActive--;
    }
    this.imgMap.draw();
  }


  save(){
    let coordinantes =[];

    for(let coordinantes_ of this.markers){
      coordinantes.push({"Coordenadax":coordinantes_[0],"Coordenaday":coordinantes_[1]})
    }

    let data ={
      IdArchivo: this.data.id_image,
      Coordenadas:coordinantes,
      Tipo: this.type_document
    }

    console.log(data);
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
    this.markers = []
  }

  validateSave(){
    let response= true;
    if(this.type_document && this.markers.length > 0){
      response= false;
    }

    return response;
  }

  getImagesForTrainig(){

    this.fileService.getFilesToBase64(this.data.id_document).finally(() =>{

    }).subscribe((response)=>{
      let image = response.Imagenes.filter((image) => {return image.IdDocumentoImagen == this.data.id_image;});
      this.image.base64 =image[0].DocumentoImagen;
      this.image.ext = image[0].MimeTypeIm
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
