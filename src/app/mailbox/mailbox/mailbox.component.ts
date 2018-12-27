import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HelperService } from '../../shared/helper.service';
import { MailboxService } from '../mailbox.service';
import { interval,Subscription } from 'rxjs';


@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.css']
})
export class MailboxComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['posicion','NombreOrigen', 'NoPagina', 'NombrePagina', 'EstatusProcesamiento',];
  public dataSource = new MatTableDataSource([]);
  public loading = false;
  public procesing= true;
  public interval_:Subscription;
  public openModal = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  constructor(public helperService:HelperService, public mailboxService:MailboxService) { }

  ngOnInit() {
    this.getFileInProcess();
    this.interval_= interval(60000).subscribe(val => {
      this.getFileInProcess();
    });
  }

  ngOnDestroy(){
    this.interval_.unsubscribe();
  }


  getFileInProcess(){
    this.loading = true;
    this.mailboxService.getFileprocesing({}).finally(() => {
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
          IdDocumentoImagen:response[index].IdDocumentoImagen,
          NombreOrigen: response[index].NombreOrigen, 
          EstatusProcesamiento: response[index].EstatusProcesamiento, 
          NoPagina: response[index].NoPagina, 
          NombrePagina: response[index].NombrePagina, 
          Imagen: response[index].Imagen,
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
