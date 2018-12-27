import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface FileEvent {
  size: number, /* bytes */
  type: string,
  name: string,
  content: string
}

@Component({
  selector: 'file-base64-input',
  templateUrl: './file-base64-input.component.html',
  styleUrls: ['./file-base64-input.component.css']
})
export class FileBase64InputComponent {

  @Input() public showInputFileName: boolean;
  @Input() public name: string;
  @Input() public id: string;
  @Input() public text: string;
  @Input() public accept = '*';
  @Input() public multiple = false;
  @Input() public size = 10485760;
  @Output() public messageError = new EventEmitter();

  public result: FileEvent[] | FileEvent;
  public filename: string;

  private onTouchedCallback: (_: any) => void;
  private onChangeCallback: (_: any) => void;

  @Output() public read = new EventEmitter<FileEvent[] | FileEvent>();
  @Output() public loading = new EventEmitter();
    public propagateChange(value: any, emit:boolean=false): void {
      if (this.multiple) {
        if (!this.result) {
            this.result = [];
        }

        (<any[]>this.result).push(value);
      } else {
        this.result = value;
      }

      if(emit || !this.result){
        this.read.emit(this.result)
      }
      
      
    }

    public registerOnChange(fn) {
      this.onChangeCallback = fn;
    }

    public registerOnTouched(fn) {
      this.onTouchedCallback = fn;
    }

    public changeListener($event): void {
      this.readThis($event.target);
    }

    public setData(){
      this.result = [];
      this.filename = '';
  }

    public readThis(inputValue: any): void {
      let fileCount = 0
      let emit = false
      
      if (!this.multiple) {
        this.filename = inputValue.files[0].name;   
      } else {
        this.filename =`Cargando ${inputValue.files.length} Archivos`;
      }

      this.loading.emit({loading:inputValue.files.length>0 ?true:false, message:this.filename,tota_files:inputValue.files.length});

      for (let i = 0; i < inputValue.files.length; i++) {
        let file: File = inputValue.files[i];
        let fr: FileReader = new FileReader();
        
        if(this.size && file.size > this.size){
          this.messageError.emit( `El tamaño del archivo ${file.name} revasa el limite permitido ${(this.size/(1024*1024))} Mb`) 
          this.read.emit([])
          this.filename = '';
          break;
        }  else if(!this.validate(inputValue.files)){
          this.messageError.emit(`El formato del archivo ${file.name} no es permitido`);
          this.read.emit([])
          this.filename = '';
          break;
        } else {
          fr.onloadend = (e) => {
            fileCount++;
            
            let result = {
              size: file.size, /* bytes */
              type: file.type,
              name: file.name,
              content: this.arrayBufferToBase64(fr.result)
            }

            if(fileCount == inputValue.files.length){
              emit=true;
            }

            this.propagateChange(result, emit);
          }
  
          fr.readAsArrayBuffer(file);
        }
      }
    }

    private arrayBufferToBase64(buffer) {
      let binary = '';
      let bytes = new Uint8Array(buffer);
      let len = bytes.byteLength;

      for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
      }

      return window.btoa(binary);
    }

    private validate(value) {
      let valid = true;
      let regExp;
      let exp;
      let fileExt;

      if (this.accept && this.accept !== '*') {
          exp = this.accept.trim().replace(/[,\s]+/gi, '|').replace(/\./g, '\\.').replace(/\/\*/g, '/.*');
          regExp = new RegExp(exp);
      }

      if (exp && this.accept && value) {
          if (this.multiple) {
              for (let i = 0; i < value.length; i++) {
                  let file = value[i];
                  fileExt = '.' + file.name.split('.').pop();
                  valid = regExp.test(file.type) || regExp.test(fileExt);

                  if (!valid) {
                      break;
                  }
              }
          } else {
              fileExt = '.' + value.filename.split('.').pop();
              valid = regExp.test(value.filetype) || regExp.test(fileExt);
          }
      }

      return valid;
  }

}
