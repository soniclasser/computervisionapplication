import { Component, OnInit, ViewEncapsulation,ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

import { SearchFilesService } from '../search-files.service';
import { FileService } from '../../shared/file.service';
import { HelperService } from '../../shared/helper.service';


@Component({
  selector: 'app-search-files',
  templateUrl: './search-files.component.html',
  styleUrls: ['./search-files.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchFilesComponent implements OnInit {
  public displayedColumns: string[] = ['posicion','nombre_archivo', 'fecha_carga', 'acciones',];
  public dataSource = new MatTableDataSource([]);
  public loading = false;
  public procesing= true;
  public value = '';
  public checked = false;
  public slideText = 'Busqueda por texto';
  public autocompled = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public searchFilesService:SearchFilesService,public helperService:HelperService,public fileService:FileService) {
   this.getQualificacionList(); 
  }
  public myControl = new FormControl();
  public options:any = [];
  filteredOptions: Observable<any[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  getQualificacionList(){
    this.loading = true;

    this.searchFilesService.getQualificacionList().finally(() => {
      this.loading = false;
    })
    .subscribe((response) => {
      this.options = response;
      
    }, (error) => {
      if(error.status == 500){
        this.helperService.showError('Error', error.message || 'No se ha encontrado información del error');
      }

      if(error.status == 404 ){
        this.helperService.showWarning('!Atencion!', error.message);
      }
    })  

  }   
  slideToggle(event){
    this.checked = event.checked;
    this.slideText = event.checked ? 'Busqueda por clasificacion' : 'Busqueda por texto';
  }

  
  search(value){
    this.loading = true;

    let params ={
      type_search:this.checked? 1 : 0,
      text:value
    }
    this.searchFilesService.searchFilesByTextOrQualification(params).finally(() => {
      this.loading = false;
    })
    .subscribe((response) => {
      let data = []

      for(let index in response){
        data.push({
          posicion: parseInt(index)+1,
          id:response[index].IdDocumentoCargado,
          nombre_archivo: response[index].NombreOrigen,
          fecha_carga:response[index].FechaModifica,
        })
      }

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

      if(response.length ==0) {
        this.helperService.showWarning('!Atencion!', 'no encotraron datos en proceso o procesados')
      }
      
    }, (error) => {
      if(error.status == 500){
        this.helperService.showError('Error', error.message || 'No se ha encontrado información del error');
      }

      if(error.status == 404 ){
        this.helperService.showWarning('!Atencion!', error.message);
      }
    })  
    
  }


  
  private _filter(value: string): string[] {
    let filterValue = value.toLowerCase();
    return this.options.filter(option => option.Descripcion.toLowerCase().includes(filterValue));
  }

  onSelectionChanged(event){
    this.search(event.option.value);
  }

  showDocumentOrigin(id){
    this.fileService.getFilesToBase64(id).finally(() => {
      this.loading = false;
    })
    .subscribe((response) => {
      
      let file  ={
        mime_type: this.helperService.getMimeType(response.MimeTypeDoc),
        content:response.DocumentoOrigen,
       }
       
      this.helperService.generateView(file)
      
    }, (error) => {
      if(error.status == 500){
        this.helperService.showError('Error', error.message || 'No se ha encontrado información del error');
      }

      if(error.status == 404 ){
        this.helperService.showWarning('!Atencion!', error.message);
      }
    })
  }
}
