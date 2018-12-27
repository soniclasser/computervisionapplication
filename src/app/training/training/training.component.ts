import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HelperService } from '../../shared/helper.service';
import { TrainingService } from '../training.service'
import { interval,Subscription } from 'rxjs';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['posicion','NombreOrigen', 'NoPagina', 'NombrePagina', 'actions',];
  public dataSource = new MatTableDataSource([]);
  public loading = false;
  public procesing= true;
  public openModal = false;
  public interval_:Subscription;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public helperService:HelperService, public trainingService: TrainingService ){ }

  ngOnInit() {
    this.getFileFinished();
    this.interval_= interval(60000).subscribe(val => {
      this.getFileFinished();
    });
  }

  ngOnDestroy(){
    this.interval_.unsubscribe();
  }

  getFileFinished(){
    this.loading = true;
    this.trainingService.getFileFinished({status: 3}).finally(() => {
      this.loading = false;
    })
    .subscribe((response) => {      
      let data = [];
      for(let index in response){
        let color = '#28a745';
        if( response[index].EstatusProcesamiento == 'INICIADO'){
          color = '#ffc107';
        }
        data.push({
          posicion:parseInt(index)+1,
          IdDocumentoCargado:response[index].IdDocumentoCargado,
          IdArchivoImagen:response[index].IdDocumentoImagen,
          NombreOrigen: response[index].NombreOrigen, 
          EstatusProcesamiento: response[index].EstatusProcesamiento, 
          NoPagina: response[index].NoPagina, 
          NombrePagina: response[index].NombrePagina, 
          color: color
        })
      }

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

      if(response.length ==0) {
        this.helperService.showWarning('!Atencion!', 'no encotraron datos en proceso o procesados')
      }
    }, (error) => {
      this.helperService.showError('Error', error.message || 'No se ha encontrado información del error');
    })  

  }
}
