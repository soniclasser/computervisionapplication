import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private toastr: ToastrService,private sanitizer:DomSanitizer) { }
  showSuccess(title:string, message:string) {
    this.toastr.success(message, title);
  }

  showError(title:string, message:string) {
      this.toastr.error(message, title);
  }

  showWarning(title:string, message:string) {
      this.toastr.warning(message, title);
  }

  showInfo(message:string) {
    this.toastr.info(message);
  }

  buildFile(file){
    let base64str = file.content;
    let binary = atob(base64str.replace(/\s/g, ''));
    let len = binary.length;
    let buffer = new ArrayBuffer(len);
    let view = new Uint8Array(buffer);
    
    for (let i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }
    
    let blob = new Blob( [view], { type: file.mime_type });//"application/pdf"
    return  URL.createObjectURL(blob);
  }

  generateView(file){
      let win = window.open();
      let url = this.buildFile(file);
      let element = file.mime_type == 'application/pdf' ? `<embed src="${url}"  type="${file.mime_type}" width="100%" height="100%">` :
      `<img  src="${url}" />`
      win.document.write(element);
  }

  formatUsDate(date){
    let date_: Date;
    
    if(date){
      date_ = new Date(date);
    }else{
      date_ = new Date();
    }
   
    let day = date_.getDate();
    let month = date_.getMonth()+1;
    let year = date_.getFullYear();

    return `${month}-${day}-${year}`;
  }

  getMimeType(ext:string){
    let mimeType = ''
    
    switch(ext){
      case 'JPG': 
      case 'JPEG':
      case 'PNG':
        mimeType = `image/${ext.toLowerCase()}`
      break;
      case 'PDF':
        mimeType = `application/pdf`
      break;
    }

    return mimeType;
  }

  validateDateMax(max:Date,date:Date){

    if((date > max)){
      return false
    }
    
    return  true;
  }

  validateDateMin(min:Date,date:Date){

    if(date < min){
      return false
    }
    
    return  true;
  }

  imageFormat(image:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:${this.getMimeType(image.ext)};base64,${image.base64}`);
  }

  getUrlBase64(image:any){
    return `data:${this.getMimeType(image.ext)};base64,${image.base64}`
  }
}
