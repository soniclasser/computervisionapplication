import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';
import { HelperService } from '../../shared/helper.service';
import { QualificationService } from '../qualification.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class QualificationComponent implements OnInit {
  public displayedColumns: string[] = [
    'posicion',
    'name_origin', 
    'status_qualification', 
    'date_qualification', 
    'date_upload',
    'actions',
  ];
  public dataSource= new MatTableDataSource([]);
  public loading = false;
  public procesing= true;
  public openModal = false;
  public minDate = new Date(2000, 0, 1);
  public maxDate = new Date();
  public startDate:FormControl;
  public endDate:FormControl;
  public selectedValue:number;
  public status =[
    { value: 2,
      viewValue: 'Todos',
      icon: 'public'
    },
    { value: 1,
      viewValue:'Calificado',
      icon:'check'
    },
    { value: 0,
      viewValue:'Sin calificar',
      icon:'close'
    },
  ]

  public selectedValueObjet=this.status[2]

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public qualificationService:QualificationService, public helperService:HelperService) { 
  }

  ngOnInit() {  
    this.setInitValue();
    this.getFileQualification()
  }

  setInitValue(){
     this.dataSource = new MatTableDataSource([ ]);
     this.startDate = new FormControl(new Date());
     this.endDate = new FormControl(new Date());
     this.selectedValue = 2;
  }

  getInitValue(value){
    let index = this.status.findIndex(data => data.value === value);
    this.selectedValueObjet = this.status[index];
  }


  getFileQualification(){
    this.loading = true;
    
    let params ={
      status: this.selectedValue,
      fecha_inicio: this.helperService.formatUsDate(this.startDate.value),
      fecha_fin: this.helperService.formatUsDate(this.endDate.value)
    }

    this.qualificationService.getFileQualification(params).finally(() => {
      this.loading = false;
    })
    .subscribe((response) => {      
      let data = []

      for(let index in response){
        data.push({
          posicion: parseInt(index)+1,
          id:response[index].IdDocumentoCargado,
          name_origin: response[index].NombreOrigen,
          status_qualification:response[index].Calificacion,
          date_qualification:response[index].FechaCalificacion,
          date_upload:response[index].FechaModifica,
        })
      }
     
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

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
