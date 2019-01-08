import { Component, AfterViewInit, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialog,MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../shared/helper.service';
import { Validators, FormGroup, FormBuilder, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { SendMailModel } from '../../core/models/send-mail.model';
import { SendMailService } from '../send-mail.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements AfterViewInit {

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
    const dialogRef = this.dialog.open(SendMailComponent,{data:{id:this.id}});
    dialogRef.disableClose = true;
    
    
    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.removeItem('tmp');
      this.router.navigate(['/buscador/archivos']);    
    });
  }

}


@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class SendMailComponent implements OnInit {
  public mailForm: FormGroup;
  public options = [
    { id: 1, name: 'Documento origen' },
    { id: 2, name: 'Docmento texto' },
  ];



  constructor(@Inject(MAT_DIALOG_DATA) 
  public data:any, 
  public helperService:HelperService, 
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<SendMailComponent>,
  public sendMailService:SendMailService) {}

  ngOnInit() {
    let controls = this.options.map(option => new FormControl(false));
    controls[0].setValue(true);
    

    this.mailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      body: ['', Validators.required],
      options: new FormArray(controls, this.minSelectedCheckboxes(1))
 
    });
  }

  get fiels() { return this.mailForm.controls; }

  send(){
    let sendMailModel: SendMailModel;
    sendMailModel = {
      DestinatariosPrincipales:[this.mailForm.controls.email.value],
      IdDocumento: this.data.id,
      Asunto:this.mailForm.controls.title.value,
      CuerpoMensaje:this.mailForm.controls.body.value,
      Usuario:'csuarez',
      ArchivoOrgigen:this.mailForm.controls.options['controls'][0].value,
      ArchivoTexto:this.mailForm.controls.options['controls'][1].value,
    }
console.log(sendMailModel)
    this.sendMailService.sendMail(sendMailModel).finally(() => {
      this.dialogRef.close();
    })
    .subscribe((response) => {      
      this.helperService.showSuccess('¡Exito!', 'Mensaje enviado');
    }, (error) => {
      this.helperService.showError('Error', error.message || 'No se ha encontrado información del error');
    })  

  }


  minSelectedCheckboxes(min = 1) {
    let validator: ValidatorFn = (formArray: FormArray) => {
      let totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);

      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  } 
}
