import {Component, ViewChild,ViewEncapsulation} from '@angular/core';
import { HelperService } from '../../shared/helper.service'
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UploadFileModel } from '../../core/models/upload-file.model';
import { UploadFileService } from '../upload-file.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
  encapsulation: ViewEncapsulation.None,

})


export class UploadFileComponent {

  public displayedColumns: string[] = ['select', 'position', 'name', 'classification', 'status', 'extention'];
  public dataSource = new MatTableDataSource([]);
  public selection = new SelectionModel(true, []);
  public statusArray = [
    '',
    'Desclasificar',
    'Texto completo',
  ];


  public classifications =[
    { 
      value: 2,
      viewValue: this.statusArray[2],
    },
    { 
      value: 1,
      viewValue: this.statusArray[1],
    },
  ]

 

  public loading = false;
  public procesing= true;
  public disableSelect = true
  public selectedValue: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public helperService:HelperService, public uploadFileService: UploadFileService) { }

  loadFile(event){
    this.loading = false;
    let data = []
    this.dataSource.paginator = this.paginator;
    for(let index in event){
      let ext = event[index].type.split("/");
      data.push({
        position: parseInt(index)+1,
        name: event[index].name,
        file: event[index].content,
        extention: ext[1],
        status: '-',
        classification:1,
      })
    }

    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data);

    if(event.length > 0){
      this.helperService.showSuccess('Exito','!Carga exitosa!')
      this.procesing= false;
      this.disableSelect =false;
    }
    else{
      this.procesing= true;
    }
  }

  clear(){
    this.dataSource= new MatTableDataSource([]);
    this.procesing= true;
    this.disableSelect= true;
  }

  loading_(event){
    this.loading = event.loading;
    if(event.tota_files >0 ){  
      let message = event.message
      if(event.tota_files == 1){
        message = `Cargando 1 archivo`
      }  
      this.helperService.showInfo(message)
    }
  }

  errorFile(event){
    this.procesing =true;
    this.disableSelect= true;
    this.helperService.showError('Error',event)
  }

  procesingFiles(){

    let countData = 0
    for(let data of this.dataSource.data){
      let dataFile: UploadFileModel;
      let idEmpresa = 1
  
      dataFile = {
          NombreOrigen : data.name,
          DocumentoOrigen : data.file,
          idMimeType : data.extention,
          IdClasificacion: `${data.classification}`,
          Usuario_Modifica : 'Csuarez', //Cambiar esta linea cuando se tenga modulo de login
          //IdEmpresa: `${idEmpresa}`,
      }
console.log(dataFile);
      countData++;
      this.loading = true;
      this.uploadFileService.uploadFile(dataFile).finally(() => {
        this.loading = false;
        this.procesing = true;
        this.disableSelect = true;
      })
      .subscribe((response) => {
        if(this.dataSource.data.length == countData){
          let message = 'Archivos cargados'
          data.status = 'Cargado'
          if(this.dataSource.data.length == 1){
            message = 'Archivo cargado'
          }
          this.helperService.showSuccess('!Exito!', message)
        }
      }, (error) => {
        this.helperService.showError('Error', error.message || 'No se ha encontrado información del error');
      })  
    }
  }

  isAllSelected() {
    let numSelected = this.selection.selected.length;
    let numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  classificationDocuments(value){

    for(let seleted of this.selection.selected){
      let index = this.dataSource.data.findIndex(data => data.position === seleted.position);
      this.dataSource.data[index].classification = value;
    }

    this.selection.clear();
  }

  validateDisabledClasificationDocuments(){
    let response = false;
    if(this.disableSelect || this.selection.selected.length === 0){
      response = true;
    }
    
    return response;
  }
}
